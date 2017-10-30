class LoadingModal extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let divStyle;
    if(this.props.isShowing){
      divStyle = {display: 'flex'}
    }
    else{
      divStyle = {display: 'none'}
    }
    return <div className = 'loadingModal' style={divStyle}>
      <span className='loadingText'>
        Loading Data
      </span>
    </div>
  }
}

module.exports = LoadingModal;
