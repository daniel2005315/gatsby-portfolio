import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box, Text } from 'rebass';
import Typed from 'react-typed';
import Particles from "react-particles-js"
import { SectionLink } from 'react-scroll-section';

import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>    
      <Particles 
          params={{
            "fps_limit": 28,
            "particles": {
              "number": {
                  "value": 35
              },
              "size": {
                  "value": 3
              }
          },
            "retina_detect": false,
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "repulse"
                    },
                },
                "modes": {
                    "bubble": {
                        "size": 6,
                        "distance": 40
                    }
                }
            }
          }}
          style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -3,
              backgroundColor: "black",
          }}
          />
          <Triangle
            color="primaryDark"
            height={['20vh', '20vh']}
            width={['60vw', '60vw']}
            invertX
          />
    </div>
)

const centerHorizontally = { marginRight: 'auto', marginLeft: 'auto' };

const LandingPage = () => (
  <Section.Container id="home" Background={Background} >
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            name
            roles
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
          site {
            siteMetadata {
              deterministicBehaviour
            }
          }
        }
      `}
      render={({ contentfulAbout, site }) => {
        const { name, socialLinks } = contentfulAbout;
        return (
          <Fragment>
            <Heading
              textAlign="center"
              as="h1"
              color="primary"
              fontSize={[5, 6, 8]}
              mb={[3, 4, 5]}
            >
              <Typed
                strings={[
                  "Welcome!",
                  "I'm "+name+". A Software Developer",
                ]}
                loop
                typeSpeed={80}
                backSpeed={20}
                backDelay={2000}
              />
            </Heading>
            
            <Heading
              as="h2"
              color="primary"
              fontSize={[1,2,3]}
              mb={[3, 5]}
              textAlign="center"
              style={centerHorizontally}
            >
              <p>
              Self-motivated, innovative and diligent, with <span>over 2 years</span> experience in software development.<br/>
              An <span>Associate of (ISC)2</span> who is pursuing enhancement in professionality.
              </p>
            </Heading>

            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              {socialLinks.map(({ id, ...rest }) => (
                <Box mx={3} fontSize={[5, 6, 6]} key={id}>
                  <SocialLink color="primary" {...rest} />
                </Box>
              ))}
            </Flex>
            <SectionLink section="about">
              {({ onClick }) => <MouseIcon onClick={onClick} />}
            </SectionLink>
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
