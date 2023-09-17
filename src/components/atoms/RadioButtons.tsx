export default function RadioButtons(props) {
  return (
    <div>
      <label>
        <input type="radio" value="option1" checked={props.selectedOption === 'option1'} onChange={props.handleChange} />
        개인정보 노출
      </label>
      <br />
      <label>
        <input type="radio" value="option2" checked={props.selectedOption === 'option2'} onChange={props.handleChange} />
        욕설 / 인신공격
      </label>
      <br />
      <label>
        <input type="radio" value="option3" checked={props.selectedOption === 'option3'} onChange={props.handleChange} />
        음란 / 선정성
      </label>
      <br />
      <label>
        <input type="radio" value="option4" checked={props.selectedOption === 'option4'} onChange={props.handleChange} />
        불법정보
      </label>
      <br />
      <label>
        <input type="radio" value="option5" checked={props.selectedOption === 'option5'} onChange={props.handleChange} />
        권리침해
      </label>
      <br />
      <label>
        <input type="radio" value="option6" checked={props.selectedOption === 'option6'} onChange={props.handleChange} />
        기타
      </label>
    </div>
  );
}