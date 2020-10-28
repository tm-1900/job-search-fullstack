import React from "react";

/**
 * Presentational - to show bootstrap-style alerts.
 * 
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 */

function Alert({ messages }) {
  console.log('this is messages', messages)

  return (
    <div className="alert alert-danger">
      {messages.map(error => (
        <p key={error}>{error}</p>
      ))
      }

    </div>
  )
}

export default Alert;