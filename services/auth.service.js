const bycrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { models } = require('./../libs/sequelize');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.getByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      throw (boom.unauthorized(), false);
    }

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const role = user.role;

    return {
      token,
      role
    };
  }

  async getUserByGoogle(profile) {
    const email = profile.emails[0].value;
    const users = await models.User.findAll();
    let user = users.find(user => user.email === email);

    if (!user) {
      user = 'No existe el usuario';
    }

    return user;
  }

  async sendRecovery(email) {
    const user = await service.getByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtRecoveySecret, { expiresIn: '15min' });
    const link = `https://sew.onrender.com/change-password/${token}`;

    await  service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.emailSender,
      to: `${user.email}`,
      subject: "Recuperación de contraseña",
      html: `<b>Ingresa al siguiente link: ${link}</b>`
    }
    const response = await this.sendMail(mail);

    return response;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecoveySecret);
      const user = await service.getOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bycrypt.hash(newPassword, 10);

      await service.update(user.id, { password: hash, recoveryToken: null });

      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(emailInformation) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.emailSender,
        pass: config.emailPassword
      }
    });

    await transporter.sendMail(emailInformation);

    return { message: 'Email sent' };
  }

  async verifyToken(token) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.getOne(payload.sub);

      return user;
    } catch (error) {
      return false;
    }
  }
}

module.exports = AuthService;
