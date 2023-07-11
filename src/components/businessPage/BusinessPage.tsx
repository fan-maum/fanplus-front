import { BusinessPageTextType } from '@/types/textTypes';
import styles from './styles/BusinessPage.module.css';
import { useState } from 'react';

const BusinessPage = ({ texts }: { texts: BusinessPageTextType }) => {
  const [isSuccess, setIsSuccess] = useState(true);
  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles.box1}`}>
        <h1>{texts.title}</h1>
        <p>{texts.content}</p>
        <div className={styles.info}>
          <h4>Email</h4>
          <p className={styles.strong}>appfanplus@gmail.com</p>
        </div>
      </div>
      <div className={styles.box}>
        {/* <form
          className="brz-form brz-d-xs-flex brz-flex-xs-wrap"
          action="https://fanplus.co.kr/wp-admin/admin-ajax.php?action=brizy_submit_form"
          data-form-id="fwxopowcnmubkgpdluynzlksuruyoltugbnb"
          data-project-id="712f9bb8ee3d9609015acb9f162c5763"
          noValidate
          method="POST"
        >
          <div className="brz-forms2__item brz-css-dzxrp brz-css-bjfpp brz-css-aqize">
            <input
              type="text"
              id="culravmwqsyilvyfqbvukxmnzykfssyztvga"
              name="kkyqnibvdxfvfyiatukektnrqyuisxwadqxq"
              placeholder="회사명 (필수)"
              data-type="Text"
              data-label="회사명 (필수)"
              data-placeholder="회사명 (필수)"
              className="brz-input brz-forms2__field brz-forms2__field-text"
            />
          </div>
          <div className="brz-forms2__item brz-css-dzxrp brz-css-bjfpp brz-css-aqize">
            <input
              type="text"
              id="lbbkagnmenjoqgausgcqznjohwgdzdfaxnft"
              name="upgzpglpaxnpamrpmdcpzkssehglkpauvpvo"
              placeholder="담당자명 (필수)"
              data-type="Text"
              data-label="담당자명 (필수)"
              data-placeholder="담당자명 (필수)"
              className="brz-input brz-forms2__field brz-forms2__field-text"
            />
          </div>
          <div className="brz-forms2__item brz-css-dzxrp brz-css-bjfpp brz-css-aqize">
            <input
              type="email"
              id="mhlthwlomsiwglveobgdsuluvmwzhzsluxzy"
              name="kciseiitjtkzfsjccpnjvkgwdqeecdgdutay"
              placeholder="이메일 (필수)"
              pattern="%5E((%5B%5E%3C%3E()%5C%5B%5C%5D%5C%5C.,;:%5Cs@%22%5D+(%5C.%5B%5E%3C%3E()%5C%5B%5C%5D%5C%5C.,;:%5Cs@%22%5D+)*)%7C(%22.+%22))@((%5C%5B%5B0-9%5D%7B1,3%7D%5C.%5B0-9%5D%7B1,3%7D%5C.%5B0-9%5D%7B1,3%7D%5C.%5B0-9%5D%7B1,3%7D%5D)%7C((%5Ba-zA-Z%5C-0-9%5D+%5C.)+%5Ba-zA-Z%5D%7B2,%7D))$"
              data-type="Email"
              data-label="이메일 (필수)"
              data-placeholder="이메일 (필수)"
              className="brz-input brz-forms2__field brz-forms2__field-email"
            />
          </div>
          <div className="brz-forms2__item brz-css-dzxrp brz-css-bjfpp brz-css-aqize brz-css-zknqu">
            <textarea
              id="bueopkrywmcllrbiuticptquxlktothvavxw"
              name="ncnnxuhmcikxfpkkjcpdarleyfykweoqkeia"
              placeholder="문의 내용"
              data-type="Paragraph"
              data-label="문의 내용"
              data-placeholder="문의 내용"
              className="brz-textarea brz-forms2__field brz-forms2__field-paragraph"
            ></textarea>
          </div>
          <div className="brz-forms2 brz-forms2__item brz-forms2__item-button">
            <button
              className="brz-btn brz-css-oogvk brz-css-fmmuz"
              data-custom-id="ekffnlcsqyyoqukgkrjmvhrivpjxitsepcyi"
            >
              <span className="brz-span brz-text__editor">문의하기</span>
            </button>
          </div>
        </form> */}
        <form
          action="https://fanplus.co.kr/wp-admin/admin-ajax.php?action=brizy_submit_form"
          method="post"
          noValidate
          data-form-id="fwxopowcnmubkgpdluynzlksuruyoltugbnb"
          data-project-id="712f9bb8ee3d9609015acb9f162c5763"
          data-redirect="/business"
        >
          <input
            placeholder={texts.form.company}
            required
            name="kkyqnibvdxfvfyiatukektnrqyuisxwadqxq"
          ></input>
          <input
            placeholder={texts.form.officer}
            required
            name="upgzpglpaxnpamrpmdcpzkssehglkpauvpvo"
          ></input>
          <input
            type="email"
            placeholder={texts.form.email}
            required
            name="kciseiitjtkzfsjccpnjvkgwdqeecdgdutay"
          ></input>
          <textarea
            placeholder={texts.form.message}
            required
            name="ncnnxuhmcikxfpkkjcpdarleyfykweoqkeia"
          ></textarea>
          <button>
            {texts.form.button}
            <img src="/icons/icon_send.svg" />
          </button>
        </form>
        {isSuccess && <div className={styles.greenBox}>YOUR EMAIL WAS SENT SUCCESSFULLY!</div>}
      </div>
    </div>
  );
};

export default BusinessPage;
