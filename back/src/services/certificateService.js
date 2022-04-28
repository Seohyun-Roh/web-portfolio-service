import { Certificate } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certificateAuthService {
  // db에 저장
  static async addCertificate({ user_id, title, description, when_date }) {
    if (!title || !description) {
      const errorMessage = '제목과 상세내역을 입력해 주세요.';
      return { errorMessage };
    }

    const newCertificate = { user_id, title, description, when_date };

    const createdCertificate = await Certificate.create({ newCertificate });
    createdCertificate.errorMessage = null;

    return createdCertificate;
  }

  // db 조회
  static async getCertificateInfo({ certificate_id }) {
    const certificate = await Certificate.findById({ certificate_id });

    if (!certificate) {
      const errorMessage = '해당 자격증 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return certificate;
  }

  // 수정
  static async setCertificate({ certificate_id, toUpdate }) {
    let certificate = await Certificate.findById({ certificate_id });

    if (!certificate) {
      const errorMessage = '자격증 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!toUpdate.title) {
      toUpdate.title = certificate.title;
    }

    if (!toUpdate.description) {
      toUpdate.description = certificate.description;
    }

    if (!toUpdate.when_date) {
      toUpdate.when_date = certificate.when_date;
    }

    const newValues = {
      title: toUpdate.title,
      description: toUpdate.description,
      when_date: toUpdate.when_date,
    };

    certificate = await Certificate.update({ certificate_id, newValues });

    return certificate;
  }

  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findAllByUserId({ user_id });
    return certificates;
  }

  // 삭제
  static async deleteCertificate({ certificate_id }) {
    let certificate = await Certificate.findById({ certificate_id });

    if (!certificate) {
      const errorMessage = '자격증 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const res = await Certificate.delete({ certificate_id });

    return res;
  }
}

export { certificateAuthService };
