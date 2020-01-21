import React, { Component } from 'react';
import Moment from 'moment'
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {

  getEducation = ()=>{
    const { education } = this.props;

    if(education){
      const eduItems = education.map(edu => (
        <li key={edu._id} className="list-group-item">
          <h4>{edu.school}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree:</strong> {edu.degree}
          </p>
          <p>
            <strong>Field Of Study:</strong> {edu.fieldofstudy}
          </p>
          <p>
            {edu.description === '' ? null : (
              <span>
                <strong>Description: </strong> {edu.description}
              </span>
            )}
          </p>
        </li>
      ));
      
      return eduItems
    }
    

    
  }

  getExpirence = ()=>{
    const { experience } = this.props;

    if(experience){
      const expItems = experience.map(exp => (
        <li key={exp._id} className="list-group-item">
          <h4>{exp.company}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
            {exp.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </p>
          <p>
            <strong>Position:</strong> {exp.title}
          </p>
          <p>
            {exp.location === '' ? null : (
              <span>
                <strong>Location: </strong> {exp.location}
              </span>
            )}
          </p>
          <p>
            {exp.description === '' ? null : (
              <span>
                <strong>Description: </strong> {exp.description}
              </span>
            )}
          </p>
        </li>
      ));
  
      return expItems
    }

    
  }
  render() {
    const { profile } = this.props;

    return (
      <div className="col-md-3">
        <div className="col-md-12" style={{border : '0.5px solid #C3C3C3', padding : '4px'}}>
          <div className="">
              <div className="col-12 m-auto rounded" style={{border : "0.5px solid #C3C3C3", padding : '3px'}}>
                <img
                  className="rounded"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
              
            <div className="text-center col-12" style={{margin : '10px 0px', padding : '0px'}}>
              <h3 className="text-left" style={{fontWeight : 'bold', margin : '0px'}}>{profile.user.name}</h3>
              <h4 className="text-left" style={{color : '#C3C3C3'}}>{profile.handle}</h4>
              {isEmpty(profile.user.email) ? null : (
                  <p className="text-left" style={{fontSize : '12px', margin : '0px', padding : '0px'}}>
                    {/* <i className="fas fa-envelope" style={{marginRight : '4px'}} /> */}
                  <a
                    className="text-primary"
                    href={profile.user.email}
                    target="_blank"
                    style={{padding : '0px'}}
                  >
                   {profile.user.email}
                  </a>
                  </p>
                )}
              </div>

              <div className='col-12' style={{border  :'0.5px solid #C3C3C3'}}></div>

              <p className="lead" style={{fontSize : '14px', margin : '8px 4px', }}>
              {
                isEmpty(profile.bio) ? null
                  : 
                (<span>{profile.bio}</span>)
               }
            </p>
               
            {isEmpty(profile.bio) ? null : <div className='col-12' style={{border  :'0.5px solid #C3C3C3'}}></div> }
              <div className='rounded' style={{padding : '4px', border : ''}}> 
              <p className="text-left" style={{fontSize : '14px', margin : '0px'}}> 
                <i class="fas fa-briefcase" style={{marginRight : '4px'}}></i> {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              
              {
                isEmpty(profile.location) ? null : 
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}><i class="fas fa-map-marker-alt" style={{marginRight : '4px'}}></i> {profile.location}</p>
              }
              
              {/* {isEmpty(profile.user.email) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fas fa-envelope" style={{marginRight : '4px'}} />
                  <a
                    className="text-primary p-2"
                    href={profile.user.email}
                    target="_blank"
                  >
                   {profile.user.email}
                  </a>
                  </p>
                )} */}

                {isEmpty(profile.website) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fas fa-globe" style={{marginRight : '4px'}} />
                  <a
                    className="text-primary p-2"
                    href={profile.website}
                    target="_blank"
                  >
                   Website
                  </a>
                  </p>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fab fa-twitter " style={{marginRight : '4px'}}/>
                  <a
                    className="text-primary p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    Twitter
                  </a>
                  </p>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fab fa-facebook" style={{marginRight : '4px'}}/>
                  <a
                    className="text-primary p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    Facebook
                  </a>
                  </p>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fab fa-linkedin" style={{marginRight : '4px'}}/>
                  <a
                    className="text-primary p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                  </p>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fab fa-youtube " style={{marginRight : '4px'}}/>
                  <a
                    className="text-primary p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    YouTube
                  </a>
                  </p>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <p className="text-left" style={{fontSize : '14px', margin : '0px'}}>
                    <i className="fab fa-instagram" style={{marginRight : '4px'}}/>
                  <a
                    className="text-primary p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    Instragam
                  </a>
                  </p>
                )}
            </div>
            
          </div>
         
        </div>
        <div className='col-12 ' style={{border : '0.5px solid #C3C3C3', padding : '4px', margin : '8px 0px'}}>
              <h6 className='lead' style={{margin : '4px 0px', fontWeight : 'bold'}}> Education</h6>
              <div className="col-12 " style={{border : "0.5px solid #C3C3C3"}}></div>
                 
                  {this.getEducation() && this.getEducation().length > 0 ? (
                    <ul className="list-group">{this.getEducation()}</ul>
                  ) : (
                    <p className="text-center" style={{margin : '4px 0px'}}>No Education Listed</p>
                  )}
            </div>
            <div className='col-12 ' style={{border : '0.5px solid #C3C3C3', padding : '4px', margin : '8px 0px'}}>
              <h6 className='lead' style={{margin : '4px 0px', fontWeight : 'bold'}}> Experience</h6>
              <div className="col-12 " style={{border : "0.5px solid #C3C3C3"}}></div>
                 
                  {this.getExpirence() && this.getExpirence().length > 0 ? (
                    <ul className="list-group">{this.getExpirence()}</ul>
                  ) : (
                    <p className="text-center" style={{margin : '4px 0px'}}>No Experience Listed</p>
                  )}
            </div>
            <div className='col-12' style={{padding : '0px', margin : '4px 0px'}}>
              
                {profile.skills.map((skill, index) => (
                  <span 
                  style={{
                    margin : '0px 3px',
                    padding : '3px'
                  }} 
                  key={index} 
                  className="badge badge-primary">

                {skill}
                </span>
                  
                ))}
               
              
            </div>
      </div>
    );
  }
}

export default ProfileHeader;
