class IDPADivisionContainer extends React.Component {

  constructor(props){
    super(props);
    var self = this;
    let numForClass = this.numForClass.bind(this);
  }

  numForClass(cl){
    var self = this;
    for(let n of self.props.nums){
      if(n[0] == cl){
        return n[1];
      }
    }
  }


  componentDidUpdate(){
    var self = this;

  }
  render() {
    var self = this;
    return <div className='divContainer'>
    <div className={self.props.name+'DivisionName'}>{self.props.name}</div>
    <div className={self.props.name+'DM'}>Distinguished Master: {self.numForClass('DM') > 0 ? self.numForClass('DM') : 0}</div>
    <div className={self.props.name+'MA'}>Master: {self.numForClass('MA') > 0 ? self.numForClass('MA') : 0}</div>
    <div className={self.props.name+'EX'}>Expert: {self.numForClass('EX') > 0 ? self.numForClass('EX') : 0}</div>
    <div className={self.props.name+'SS'}>Sharpshooter: {self.numForClass('SS') > 0 ? self.numForClass('SS') : 0}</div>
    <div className={self.props.name+'MM'}>Marksman: {self.numForClass('MM') > 0 ? self.numForClass('MM') : 0}</div>
    <div className={self.props.name+'NO'}>Novice: {self.numForClass('NV') > 0 ? self.numForClass('NV') : 0}</div>
    <div className={self.props.name+'UN'}>Unclassified: {self.numForClass('UN') > 0 ? self.numForClass('UN') : 0}</div>
    </div>

  }
}

module.exports = IDPADivisionContainer;
