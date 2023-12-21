import React from 'react';

class UserRequestChatBox extends React.Component {
  render() {
    const { children, className } = this.props;
    return <button className={className}>{children}</button>;
  }
}

export default UserRequestChatBox;
