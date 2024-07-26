import { useLogto, type UserInfoResponse } from "@logto/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, redirectUrl } from "../../lib/auth/socket-logto";
import * as styles from "./index.module.css";
import { useNavigator } from "../../lib/navigator";

const Home = () => {
  const { isAuthenticated, signIn, signOut, fetchUserInfo } = useLogto();
  const [user, setUser] = useState<UserInfoResponse>();

  const navigate = useNavigate();
  useNavigator(navigate);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const userInfo = await fetchUserInfo();
        setUser(userInfo);
      }
    })();
  }, [fetchUserInfo, isAuthenticated]);

  return (
    <div className={styles.container}>
      <h3>Logto React sample</h3>
      <button onClick={() => navigate("/more")}>more</button>
      {!isAuthenticated && (
        <>
          <button
            type="button"
            onClick={() => {
              void signIn(redirectUrl);
            }}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              void signIn(redirectUrl, "signUp");
            }}
          >
            Sign up
          </button>
        </>
      )}
      {isAuthenticated && (
        <button
          type="button"
          onClick={() => {
            void signOut(baseUrl);
          }}
        >
          Sign out
        </button>
      )}
      {isAuthenticated && user && (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(user).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    {typeof value === "string" ? value : JSON.stringify(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul>
            <li>
              <Link to="/protected">View protected resource</Link>
            </li>
            <li>
              <Link to="/protected/react-query">
                View user info via react-query
              </Link>
            </li>
            <li>
              <Link to="/protected/organizations">View organizations</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
