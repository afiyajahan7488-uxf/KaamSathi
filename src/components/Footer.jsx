import React from 'react';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/20 backdrop-blur-md mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold gradient-text mb-3">KaamSathi</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Your trusted partner for all home services. Connecting you with skilled professionals
              for plumbing, carpentry, electrical work, and more. Quality service at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 KaamSathi. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <span className="text-lg">📘</span>
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <span className="text-lg">🐦</span>
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <span className="text-lg">📷</span>
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <span className="text-lg">💼</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
