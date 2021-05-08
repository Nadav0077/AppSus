export function LongTxt(props) {
    var txtToShow = (props.text.length > 100 && !props.isLongTxtShown) ? props.text.substring(0, 100) + '...' : props.text;
    return <p className="details-desc" onClick={props.onChangeDesc}>{txtToShow}</p>
}