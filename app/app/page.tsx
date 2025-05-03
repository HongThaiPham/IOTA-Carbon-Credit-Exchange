"use client";

export default function Home() {
  return (
    <div>
      <h2 className="page-title">Carbon Credit Tokenization Dashboard</h2>

      <div className="kyber-card mb-6">
        <div className="kyber-card-header">
          <div className="kyber-card-title">Welcome to the Dashboard</div>
        </div>
        <div className="kyber-card-section">
          <p className="welcome-text mb-4">
            Welcome to the Carbon Credit Tokenization Dashboard. This platform
            allows you to create, manage, mint, trade, and redeem tokenized
            carbon credits on the blockchain.
          </p>
          <p className="welcome-text">
            Use the sidebar navigation to access different sections of the
            dashboard or select one of the quick actions below.
          </p>
        </div>
      </div>
    </div>
  );
}
