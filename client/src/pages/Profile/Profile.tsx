import tw from "twin.macro";
import { useAppSelector } from "../../App/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ProfileLinks from "../../utils/profile-links";
import ProfileLink from "./components/ProfileLink";

function Profile() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const profile = useAppSelector((state) => state.profile);

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
