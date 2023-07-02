import tw from "twin.macro";
import { Link } from "react-router-dom";
import styled from "twin.macro";

function Navbar() {
  return (
    <Wrapper>
      <div className="flex items-center justify-between w-full h-full">
        <div>
          <Link to="/">
            <img src={"/jerskits-black.jpg"} alt="Home" />
          </Link>
        </div>
        <div className="flex gap-10">
          <NavLink to="/category/mens">Men</NavLink>
          <NavLink to="/category/womans">Woman</NavLink>
          <NavLink to="/category/kids">Kids</NavLink>
          <NavLink to="/category/brands">Brands</NavLink>
        </div>
        <div className="flex gap-10">
          <button aria-label="search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 16L19 19" stroke="black" strokeWidth="1.2" />
              <circle
                cx="11.5"
                cy="11.5"
                r="5.9"
                stroke="black"
                strokeWidth="1.2"
              />
            </svg>
          </button>
          <button aria-label="bag">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11M4 8H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8Z"
                stroke="black"
                strokeWidth="1.2"
              />
            </svg>
          </button>
          <button aria-label="favorite">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 4C4.23858 4 2 6.23858 2 9C2 10.1256 2.07548 11.4927 3.35671 12.9874C4.63793 14.4822 12 21.0004 12 21.0004C12 21.0004 19.3621 14.4822 20.6433 12.9874C21.9245 11.4927 22 10.1256 22 9C22 6.23858 19.7614 4 17 4C14.2386 4 12 6.23858 12 9C12 6.23858 9.76142 4 7 4Z"
                stroke="black"
                strokeWidth="1.2"
              />
            </svg>
          </button>
          <NavLink to="/sign-in">Sign In</NavLink>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = tw.div`container mx-auto h-[90px]`;
const NavLink = styled(Link)`
  text-sm font-semibold text-primary-black
`;

export default Navbar;
