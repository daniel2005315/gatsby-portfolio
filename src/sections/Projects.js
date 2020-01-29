import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box, Button } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';

import Tippy from '@tippy.js/react';

import ModalCard from '../components/ModalCard';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '200px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: calc(100% - ${CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};
  max-height: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const ProjectImage = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} 
  ); 

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Project = ({
  name,
  description,
  projectUrl,
  projectDetails,
  repositoryUrl,
  type,
  publishedDate,
  logo,
  demoUrl,
  props
}) => (
  <Fragment>
  <ModalCard name={name} description={description} demoUrl={demoUrl} projectDetails={projectDetails}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <Box mx={1} fontSize={5}>
          <Hide query={MEDIA_QUERY_SMALL}>
            <ImageSubtitle bg="primaryDark" y="bottom" x="left" round>{publishedDate}</ImageSubtitle>
          </Hide>
        </Box>     
        <Box mx={1} fontSize={5}>
        <span>
          <Title my={2} pb={1}>
            {name}
          </Title>
        </span>        
        </Box>
        <Text width={[1]} pl={4}style={{ overflow: 'auto' }}>
          {description}
        </Text> 
      </TextContainer>

      <ImageContainer>
        <ProjectImage src={logo.image.src} alt={logo.title} />
        <ProjectTag>
          <Flex
            style={{
              float: 'right',
            }}
          >
            <Box mx={1} fontSize={5}>
              <SocialLink
                name="Check repository"
                fontAwesomeIcon="github"
                url={repositoryUrl}
                color="black"
              />
            </Box>
            <Box mx={1} fontSize={5}>
              <SocialLink
                name="See project"
                fontAwesomeIcon="globe"
                url={projectUrl}
                color="black"
              />
            </Box>
          </Flex>
          <ImageSubtitle bg="backgroundDark" color="primary" y="bottom" x="right" round>
            {type}
          </ImageSubtitle>
        </ProjectTag>
      </ImageContainer> 
    </Flex>
  </ModalCard>
  </Fragment>
);

Project.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectDetails: PropTypes.object,
  projectUrl: PropTypes.string,
  repositoryUrl: PropTypes.string,
  type: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
  demoUrl: PropTypes.string,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" icon="💻" label="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          contentfulAbout {
            projects {
              id
              name
              description
              projectDetails {
                json
              }
              projectUrl
              repositoryUrl
              publishedDate(formatString: "YYYY")
              type
              logo {
                title
                image: resize(width: 200, quality: 100) {
                  src
                }
              }
              demoUrl
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <CardContainer minWidth="350px">
          {contentfulAbout.projects.map((p, i) => (            
            <Fade bottom delay={i * 200} key={p.id}>
              <Project {...p} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
