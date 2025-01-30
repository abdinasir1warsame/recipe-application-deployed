import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="p-4 bg-base-100 md:p-8 lg:p-10 shadow-md text-white">
      <div className="mx-auto max-w-screen-xl text-center">
        <div className="flex justify-center gap-5 items-center text-4xl font-semibold text-gray-300 dark:text-white">
          <img
            src="https://img.icons8.com/color/50/000000/food.png"
            alt="Logo"
          />
          Flavor Layer
        </div>
        <p className="my-6 text-white text-lg">
          All-in-one recipe manager with AI-powered creation, scanning, and
          website imports—your ultimate digital cookbook
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <Link
            to={'search'}
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Recipe Generator
          </Link>

          <div>
            {' '}
            <Link
              to={'/generate-recipe'}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              Ai Recipe
            </Link>
          </div>
          <div>
            {' '}
            <Link
              to={'/planner'}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              Planner
            </Link>
          </div>
          <div>
            <Link
              to={'/cookbook'}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              Cook Book
            </Link>
          </div>
          <div
            onClick={() => scrollToSection('pricing')}
            className="text-white hover:bg-gray-700 px-3  rounded-md"
          >
            Pricing
          </div>
          <div
            onClick={() => scrollToSection('faq')}
            className="text-white hover:bg-gray-700 px-3 rounded-md "
          >
            FAQ
          </div>
        </ul>
        <span className=" text-white sm:text-center text-white">
          © 2025{' '}
          <a href="#" className="hover:underline">
            Flavor Layer™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
