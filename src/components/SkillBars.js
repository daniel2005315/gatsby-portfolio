import React from 'react';
import { SkillBar } from 'react-skillbars';
import { Fragment } from 'react';

const skills = [
    {type: "Java", level: 90},
    {type: "Javascript", level: 80},
    {type: "C#", level: 70},
    {type: "React", level: 70},
    {type: "Python", level: 60},
    {type: "Ruby", level: 40},
  ];
  

const SkillBars  = () => (
    <Fragment>
      <SkillBar skills={skills}/>
    </Fragment>
);

export default SkillBars;
