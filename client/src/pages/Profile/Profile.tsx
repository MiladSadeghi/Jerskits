import tw from "twin.macro";
import { useAppSelector } from "../../App/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ProfileLinks from "../../utils/profile-links";
import ProfileLink from "./components/ProfileLink";
import { useSignOutMutation } from "../../App/feature/auth/authSliceApi";

function Profile() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const profile = useAppSelector((state) => state.profile);
	const [signOut] = useSignOutMutation();

  if (!isAuthenticated)
    return <Navigate to="/" state={{ from: location }} replace />;
  return (
    <Wrapper>
      <div className="flex justify-between">
        <div className="w-[350px]">
          <div className="flex flex-col space-y-7">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-14 h-14 bg-[#e4e6e7] rounded-full">
                <img src="/blank-profile-picture.png" className="w-10 h-10 " />
              </div>
              <h1 className="ml-5 font-bold capitalize text-primary-black text-text-xl">
                Hi, {profile.username}
              </h1>
            </div>
            {ProfileLinks.map((link, index) => (
              <ProfileLink {...link} key={index} />
            ))}
            <button className="flex justify-between duration-100 ease-in-out font-bold text-lg leading-[150%] text-primary-black" onClick={() => signOut()}>
              Logout{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M8.90997 20.4201L15.43 13.9001C16.2 13.1301 16.2 11.8701 15.43 11.1001L8.90997 4.58008"
                  stroke="#B9B9B9"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full max-w-[400px]">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = tw.div`mx-auto max-w-[950px] my-24`;

export default Profile;
