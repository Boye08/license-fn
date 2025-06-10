import { SignIn } from '@clerk/clerk-react';

function Login() {
  return (
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', marginTop: '360px' }}>
        <SignIn />
    </div>
  );
}

export default Login
