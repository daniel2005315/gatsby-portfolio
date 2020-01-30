import React, { Fragment } from 'react';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor'

const StyledSkill = styled.ul`
    margin: 0 0 30px 0;
    padding: 0;
    width: calc(100% - 50px);
    li {
    display: block;
    position: relative;
    background-color: #888;
    color: #fff;
    margin: 10px 0;
    transition: width 1000ms ease-in-out;
    .collapsed & {
        width: 0 !important;
    }
    p {
        padding: 10px;
        margin: 0;
        font-weight: bold;
    }
    span {
        position: absolute;
        right: 10px;
        display: inline-block;
        width: 30px;
        top: 11px;
        text-align: right;
        font-weight: normal;
        color: #fff;
        font-size: 11px;
    }
`;

  class SkillBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = { collapsed: true };
    }
  
    render() {
      const { hue, saturation, skills } = this.props;
  
      return(
        <Fragment>
          <VisibilitySensor partialVisibility={true}>
              {({isVisible}) =>
              <div id="app" className={`container ${!isVisible ? 'collapsed' : ''}`}>
              <StyledSkill >
                  {skills.map((skill, index) => 
                  <li
                      key={skill.type}
                      style={{ width: `${skill.level}%`, backgroundColor: `hsl(${hue}, ${saturation}%, ${100 / (index + 2) }%)` }}
                  >
                      <p>{skill.type}<span>{skill.level}</span></p>
                  </li>
                  )}
              
              </StyledSkill>
              </div>
              }
          </VisibilitySensor>
        </Fragment>
      )
    }
  }

  export default SkillBar;
