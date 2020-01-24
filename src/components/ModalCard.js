import React, { Fragment } from 'react'
import Card from './Card'
import ReactModal from 'react-aria-modal'
import styled from 'styled-components';
import { Image, Text, Flex, Box, Button } from 'rebass';

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
      console.log(this.state);
    }

    handleModalClose = event => {
      // console.log('handleModalOpen: ', event);
      this.setState({ showModal: false })
    }

    onModalEnter = () => {
      this.setState({ modalHasEntered: true });
    };

    getApplicationNode = () => {
      return document.getElementById('___gatsby');
    }
  
    render() {
      const {children} = this.props;
      return (        
          
          <Fragment>
            <Card {... this.props} onClick={this.toggleModal}/>
            <ReactModal
                mounted={this.state.showModal}
                onEnter={this.onModalEnter}
                onExit={this.handleModalClose}
                titleText="Project Modal"
                // initialFocus="#modal-close"
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
                      <Flex
                        style={{
                          float: 'right',
                        }}
                      >                      
                        
                      </Flex>
                    </Flex>

                    <Text width={[1]} style={{ overflow: 'auto'}}>
                        {this.props.description}
                    </Text>
                    {console.log(this.props.demoUrl)} 
                    {this.props.demoUrl!==null? 
                    <Box
                      sx={{
                        width: '100%',
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
                        width='560'
                        height='315'
                        src={this.props.demoUrl}
                        frameBorder='0'
                        allowFullScreen
                      />
                    </Box> : ""
                    }
                    <Flex alignItems='center'>

                          <button id="modal-close" onClick={this.handleModalClose}>Cool</button>
                    </Flex>
                    




                  </div>
              </div>
            </ReactModal>
          </Fragment>          
      )
    }
}

export default ModalCard;