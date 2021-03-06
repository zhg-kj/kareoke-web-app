import React, {Component} from 'react';
import Microphone from './pictures/microphone.png';
import GithubLogo from './pictures/githubLogo.png';
import mailIcon from './pictures/mailIcon.png';
import './frontPage.scss';
import GenerateButton from './buttons/generateButton';
import JoinButton from './buttons/joinButton';

export class FrontPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      roomList: [],
      cookieShow: "visible"
    };

    this.onJoinRoom = this.onJoinRoom.bind(this);
    this.onUpdateRooms = this.onUpdateRooms.bind(this);
    this.getRoomListForCheck = this.getRoomListForCheck.bind(this);
  }
  
  componentDidMount() {
    this.getRoomList();
  }

  getRoomList() {
    fetch('/api/getRoomList')
    .then(res => res.json())
    .then(list => this.setState({roomList: list}));
  }

  onJoinRoom(roomCode) {
    for(let i = 0; i < this.state.roomList.length; i++){
      if (this.state.roomList[i].roomCode === roomCode) {
        this.props.setRoom(roomCode);
        break;
      }
    }
  }

  onUpdateRooms(list) {
    this.setState({roomList: list});
  }

  getRoomListForCheck() {
    return this.state.roomList;
  }

  cookiesOnClick = () => {
    this.setState({cookieShow: "hidden"});
  }

  render() {
    return (
      <div className="frontPage"> 
        <div className="pageOneBox" id="pageOne">
          <div className="titleWrapper">
            <h1 className="title"><strong>OKE</strong></h1>
            <img className="microphone" src={Microphone} alt="Microphone" />
            <h4 className="subtitle">the Online Karaoke Experience</h4>
          </div>
          <div className="buttonWrapper">
            <GenerateButton onUpdateRooms={this.onUpdateRooms} getRoomListForCheck={this.getRoomListForCheck}/>
            <JoinButton onJoinRoom={this.onJoinRoom} getRoomListForCheck={this.getRoomListForCheck}/>
          </div>
        </div>
        <div className="frontExplanation">
          <h2 className="aboutTitle aboutAppTitle">WHAT IS OKE?</h2>
          <p className="aboutText aboutApp">OKE is an online karaoke platform that enables users to sing in real-time with anyone 
            in their OKE room. Users can queue up songs, pause, play, read lyrics, and watch MVs all on one browser tab. 
            Singing duets? No problem, load up your video/voice call of choice and open up an OKE room. 
            The music track will start at the exact same time for everyone so you and your friends won’t have to 
            worry about starting the song. We made everything in sync, so you can focus on singing.</p>
          <h2 className="aboutTitle aboutCreatorsTitle">ABOUT THE CREATORS</h2>
          <p className="aboutText aboutCreators">OKE is designed and developed by two high-school students Kaijun Zhuang and Yiyun Jia, 
            who enjoy singing during their free time. Its goal is to provide a fun at-home karaoke experience that can 
            easily be used with friends to provide a safer, social distance friendly way to engage in karaoke.</p>
        </div>
        <div className="contactsWrapper">
          <div className="githubWrapper">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/zhg-kj/oke"><img className="githubLogo" src={GithubLogo} alt="GithubLogo" /></a>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/zhg-kj/oke"><p className="githubLink">https://github.com/zhg-kj/oke</p></a>
          </div>
          <div className="emailWrapper">
            <a target="_blank" rel="noopener noreferrer" href="mailto:okekaraoke@gmail.com"><img className="emailIcon" src={mailIcon} alt="mailIcon" /></a>
            <a target="_blank" rel="noopener noreferrer" href="mailto:okekaraoke@gmail.com"><p className="emailLink">okekaraoke@gmail.com</p></a>
          </div>
        </div>
        <div className="cookiesWrapper" style={{visibility: this.state.cookieShow}}>
          <p className="cookiesMsg">Using this website means you agree to our use of cookies to enhance your experience.</p>
          <button className="cookiesBtn" onClick={this.cookiesOnClick}>Accept</button>
        </div>
      </div>
    );
  }
}

export default FrontPage;
