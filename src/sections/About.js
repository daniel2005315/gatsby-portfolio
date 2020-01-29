import React from 'react';
import { Box, Image, Flex, Button, Link } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';
import Hide from '../components/Hide';
import SkillBar from '../components/SkillBar';

const SKILLS = [
  {type: "Java", level: 99},
  {type: "JavaScript", level: 87},
  {type: "C#", level: 70},
  {type: "Python", level: 50},
  {type: "React.js", level: 70},
  {type: "Node.js", level: 70},
  {type: "Ruby", level: 30}
];

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['50vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
    <Triangle
      color="primaryDark"
      height={['20vh', '40vh']}
      width={['75vw', '70vw']}
      invertX
    />
    <Triangle
      color="backgroundDark"
      height={['10vh', '20vh']}
      width={['100vw', '100vw']}
    />
  </div>
);

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const CvButton = styled(Button)`
  background-color: orange;
`;

const AboutHeader = styled(Section.Header)`
  padding-top: 64px;
`;

const About = () => (
  <Section.Container id="about" Background={Background}>
    <Section.Header name="About me" icon="🙋‍♂️" label="person" pt={[4,5, 6]}/>
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          contentfulAbout {
            aboutMe {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            profile {
              title
              image: resize(width: 450, quality: 100) {
                src
              }
            }
          }
          file {
            publicURL
          }
        }
      `}
      render={data => {
        const { aboutMe, profile } = data.contentfulAbout;
        const { file } = data;
        return (
          
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <br></br><br></br>
            <Box width={[1, 1, 4 / 6]} px={4} py={[3,4]}>
              <Fade bottom>
                <ReactMarkdown
                  source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
                <Link href={file.publicURL}>
                  <CvButton >Download my CV</CvButton>
                </Link>              
              </Fade>
            </Box>

            
            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Fade right>
                <ProfilePicture
                  src={profile.image.src}
                  alt={profile.title}
                  mt={[4, 4, 0]}
                  ml={[0, 0, 1]}
                />
              </Fade>
            </Box> 
            <SkillBar hue="36" saturation="100" skills={SKILLS} />            
          </Flex>


        );
      }}
    />
  </Section.Container>
);

export default About;
