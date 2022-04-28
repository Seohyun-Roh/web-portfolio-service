import { CertificateModel } from '../schemas/certificate';

class Certificate {
  static async create({ newCertificate }) {
    const createdCertificate = await CertificateModel.create(newCertificate);
    return createdCertificate;
  }

  static async findById({ certificate_id }) {
    const certificate = await CertificateModel.findOne({ _id: certificate_id });
    return certificate;
  }

  static async update({ certificate_id, newValues }) {
    const filter = { _id: certificate_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const certificate = await CertificateModel.findOneAndUpdate(filter, update, option);
    return certificate;
  }

  static async findAllByUserId({ user_id }) {
    const certificates = await CertificateModel.find({ user_id: user_id });
    return certificates;
  }

  static async delete({ certificate_id }) {
    await CertificateModel.deleteOne({ _id: certificate_id });

    return '삭제가 완료 되었습니다.';
  }
}

export { Certificate };
