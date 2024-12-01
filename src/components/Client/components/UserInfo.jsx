import React from 'react';

function UserInfo({ user }) {
  return (
    <div className="text-center mb-4 p-4 bg-light rounded shadow-sm">
      <h2>Bienvenue, {user.full_name}</h2>
      <p className="text-muted">Email : {user.email}</p>
    </div>
  );
}

export default UserInfo;
