import React, { useContext, useState } from 'react'
import { Dialog, Container, Slide } from '@material-ui/core'
import { AuthContext } from '../../contexts/AuthContext'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Authenticate() {
  const { open, closeAuth } = useContext(AuthContext);
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleSignIn = () => {
    setShowSignIn(prevState => !prevState);
  }

  return (
    <Dialog open={open} onClose={closeAuth} TransitionComponent={Transition}>
      <Container component="main" maxWidth="sm">
        {showSignIn ? 
        <SignIn toggleSignIn={toggleSignIn}/> : 
        <SignUp toggleSignIn={toggleSignIn}/>
        }
      </Container>
    </Dialog>
  )
}
