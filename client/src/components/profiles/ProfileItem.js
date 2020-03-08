import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

import "./ProfileItem.css";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="profile-item col-lg-4 col-md-3 col-xs-12">
        <div className="card">
          <img
            src={profile.user.avatar}
            alt={profile.user.name + " profile pic"}
            style={{ width: "100%" }}
          />
            <h3>
              {profile.user.name.charAt(0).toUpperCase() +
                profile.user.name
                  .substring(1, profile.user.name.length)
                  .toLowerCase()}
            </h3>
          
          <Link to={`/profile/${profile.handle}`} >
            <p>
              @{profile.handle}
              {profile.verifiedAccount ? (
                <i
                  className="fas  fa-check-circle"
                  style={{ color: "#00B446", marginLeft: 5 }}
                ></i>
              ) : null}
            </p>
          </Link>

          <p className="title">{profile.status}</p>

          <p>{profile.company}</p>
          <div style={{ margin: "24px 0" }}>
            {profile.website ? (
              <a href={ profile.website} style={{ margin: 2 }}>
                <i className="fas fa-globe"></i>
              </a>
            ) : null}
            {profile.githubusername ? (
              <a href={'http://github.com/'+profile.githubusername} style={{ margin: 2 }}>
                <i className="fab fa-github"></i>
              </a>
            ) : null}
            {profile.social
              ? Object.keys(profile.social).map(social => (
                  <Link to={{pathname: profile.social[social]}} style={{ margin: 2 }}>
                    <i className={"fab fa-" + social}></i>
                  </Link>
                ))
              : null}
          </div>
          
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

// return (
//   <div className="card card-body bg-light mb-3 profile-item" style={{padding : '10px 25px'}}>
//     <div className="row" style={{padding : ''}}>
//       <div className="col-1" style={{padding : '0px'}}>
//         <img src={profile.user.avatar} alt="" className="rounded-circle" style={{height : '90px', width : '', objectFit :'cover'}} />
//       </div>
//       <div className="col-lg-6 col-md-4 col-8">
//         {/* <div className='row'> */}
//           <div>
//           <Link to={`/profile/${profile.handle}`} >@{profile.handle}</Link>
//             <span style={{marginLeft : '10px'}}>{profile.verifiedAccount ? <i class="fas  fa-check-circle" style={{color : '#00B446'}}></i> : null}</span>
//           </div>
//           <div style={{
//             marginTop : '-5px'
//           }}>
//       <small>
//           {profile.status}{' '}
//           {isEmpty(profile.company) ? null : (
//             <span>at {profile.company}</span>
//           )}
//         </small>
//       </div>
//       <div style={{
//         marginTop : '10px'
//       }}>
//         {profile.skills.slice(0, 4).map((skill, index) => (
//               <span
//               style={{
//                 margin : '0px 3px',
//                 padding : '3px',
//                 background : '#2f3094'
//               }}
//               key={index}
//               className="badge badge-primary">

//             {skill}
//             </span>

//             ))}
//       </div>

//         {/* </div> */}

//         {/* <p>
//           {isEmpty(profile.location) ? null : (
//             <span>{profile.location}</span>
//           )}
//         </p> */}
//         {/* <Link to={`/profile/${profile.handle}`} className="btn btn-info">
//           View Profile
//         </Link> */}
//       </div>

//       <div className="col-md-4 d-none d-md-block">

//       </div>
//     </div>
//   </div>
// );
