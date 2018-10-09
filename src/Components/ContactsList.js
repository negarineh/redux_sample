 import React, { Component } from 'react'
 import PropTypes from 'prop-types';
 import { connect } from "react-redux"; 
 import { userActions } from '../_actions';

 import Contact from './Contact';
 import '../Components/stylesheets/css/ContactsList.css';
 
 class ContactsList extends Component {
   constructor(props) {
     super(props);
   
     this.state = {
        list: [],
        userName: '',
        search: '',
        clicked: false,
     };
     this.onChangeInput = this.onChangeInput.bind(this);
     this.onClickInput = this.onClickInput.bind(this);
     this.onClickInfo = this.onClickInfo.bind(this);
     this.reveiveData = this.reveiveData.bind(this);
     this.close = this.close.bind(this);
   }
   
//    static propTypes = {
 
//    }
   onChangeInput(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
   }

   onClickInput() {
        let newList={
            id: Math.floor((Math.random() * 100) + 1),
            name: this.state.userName,
        };
        this.setState({list: this.state.list.concat(newList)});
        
        this.setState({userName : ''});
   }

   reveiveData() {
    this.getAllProps();

   }

   onClickInfo() {
       this.setState({clicked: true});
   }

   componentDidMount() {
    const { dispatch } = this.props;
    // this.fetchAll();
    dispatch(userActions.getAll());
   }

   close(e) {
    e.preventDefault();
    this.setState({clicked: false});
   }

   getAllProps() {
    const { users } = this.props;
    const adminArray = [];
    const allUsers = users.items;

    allUsers.forEach((content) => {
     return adminArray.push({ id: content._id,
              name: content.name});
     });
     this.setState({list: this.state.list.concat(adminArray)});

   }

   async fetchAll() {
       const response = await fetch('/allAdmins');
       const status = await response.status;
       const res = await response.json();
       const adminArray = [];

       if (status === 200)
        res.forEach((content) => {
            return adminArray.push({ id: content._id,
                     name: content.name});
        });
        this.setState({list: this.state.list.concat(adminArray)});
   }
 
   render() {
       const {userName, list, search} = this.state;

    //    const { users } = this.props;
    //    const adminArray = [];
    //    const allUsers = users.items;

    //    allUsers.forEach((content) => {
    //        console.log(content);
    //     return adminArray.push({ id: content._id,
    //              name: content.name});
    // });
    // list.concat(adminArray);
     
       let filterList = list.filter( (contact) => {
            return contact.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
       });

     return (
       <div className='wrappersubmain'>
        <div className='segment'>
            <input className="userName" name="userName" value={userName} placeholder='Name' onChange={this.onChangeInput} />
            <input className="search" name="search" value={search} placeholder='Search' onChange={this.onChangeInput} />
            <br/>
            <button type='submit' onClick={this.onClickInput} className='button' > 
                Click 
            </button>
            <button type='submit' onClick={this.onClickInfo} className='button' > 
                More Info 
            </button>
            <button type='submit' onClick={this.reveiveData} className='button' > 
                Show Data 
            </button>
                <table className='table'>
                    <thead className='info-table'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                        <tbody>
                        {filterList.map(element => {
                                return <Contact name='contact' info={element} key={element.id}/>
                        })
                        }
                        </tbody>
                        
                </table>
                {/*<dl>
                        <dt>Message</dt>
                        <dd>This is a Message</dd>
                        <dd>This is a Message</dd>
                </dl>*/}
                {this.state.clicked &&
                    <div className="overlay">
                        <div className="modal">
                            This is the program to help you to learn creating modal and implementing redux
                            <br/>
                            <button className='modalCloseButton' onClick={this.close}>Close</button>
                        </div>
                    </div>
                    }
        </div>
       </div>
     )
   }
 }

 ContactsList.defaultProps = {
    list :[],
    clicked : false,
    search : '',
    onChangeInput: () => {},
    onClickInput: () => {},
    close: () => {},
 }
 
 ContactsList.protoType = {
    list: PropTypes.array.isRequired,
    clicked: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    onClickInput: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
 }

 function mapStateToProps(state) {
    const { users } = state;
      return {
          users
      };
  }

 const connectedContactsList = connect(mapStateToProps)(ContactsList);
 export { connectedContactsList as ContactsList };
 