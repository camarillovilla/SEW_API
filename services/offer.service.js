const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OfferService {
  constructor() { }

  async getOneOffer(id){

    const offer = await models.Offer.findOne({
      where: { id },      
    });

    if (!offer) {
      throw boom.notFound('Offer not found!');
    }

    return offer;
  }

  async getRecruterOffers(recruiterId) {
    const offers = await models.Offer.findAll({
      where: { recruiterId },        
    });
    
    return offers;
  }

  async getAllOffers() {
    const offers = await models.Offer.findAll({
      include: ['recruiter'] 
    });

    return offers;
  }

  async getNumberOfRecruiterOffers(recruiterId) {
    const offers = await models.Offer.findAll({
      where: { recruiterId },        
    });
        
    return offers.length;
  }

  async getOffersByCategory(category) {
    const offers = await models.Offer.findAll({
      where: { category },        
      include: ['recruiter'] 
    });
    
    return offers;
  }

  async updateOffer(id, changes) {
    const offer = await this.getOneOffer(id);
    const updatedOffer = await offer.update(changes);

    return updatedOffer;
  }

  async createOffer(offerData) {       
    const newOffer = await models.Offer.create(offerData);
    return newOffer;
  }  
  
}

module.exports = OfferService;

