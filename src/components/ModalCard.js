import React, { Fragment } from 'react'
import Card from './Card'
import ReactModal from 'react-aria-modal'
import { Flex, Box, Button } from 'rebass';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; 

const customStyles = {
    margin: '2em',
    padding: '3em',
    backgroundColor: "white",
    transition: "all 0.25s ease-out",
};

class ModalCard extends React.Component  {
    constructor(props) {
      super(props);
      this.state = { showModal: false };  
      this.toggleModal = this.toggleModal.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
    }
    
    toggleModal() {    
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }));
    }

    handleModalClose = event => {
      this.setState({ showModal: false })
    }

    onModalEnter = () => {
      this.setState({ modalHasEntered: true });
    };

    getApplicationNode = () => {
      return document.getElementById('___gatsby');
    }
  
    render() {
      return (        
          <Fragment>
            <Card {... this.props} onClick={this.toggleModal}/>
            <ReactModal
                mounted={this.state.showModal}
                onEnter={this.onModalEnter}
                onExit={this.handleModalClose}
                titleText="Project Modal"
                focusDialog={true}
                underlayStyle={{ paddingTop: '2em'}}
                dialogStyle={customStyles}
            >              
              <div id="project-modal" className='my-modal-dialog' >
                  <div className="modal-body">
                    <Flex alignItems='center'>
                      <Box width={4/5}>
                        <h2>{this.props.name}</h2>
                      </Box>
                    </Flex>
                    {this.props.demoUrl!==null? 
                      <Box
                        sx={{
                          height: 0,
                          paddingBottom: (900 / 16) + '%',
                          position: 'relative',
                          overflow: 'hidden',
                          '& > iframe': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            border: 0
                          }
                        }}>
                        <iframe
                          width='100%'
                          height='315px'
                          src={this.props.demoUrl}
                          frameBorder='0'
                          allowFullScreen
                        />
                      </Box> : ""
                    }
                    {
                      this.props.projectDetails!==null?
                      documentToReactComponents(this.props.projectDetails.json):""
                    }                    
                    <Flex alignItems='center'>
                      <Box px = {3} width={1} mx='auto'>
                          <Button 
                            id="modal-close" 
                            bg="primaryDark"
                            onClick={this.handleModalClose}>
                            Cool!
                          </Button>
                        </Box>
                    </Flex>
                  </div>
              </div>
            </ReactModal>
          </Fragment>          
      )
    }
}

export default ModalCard;