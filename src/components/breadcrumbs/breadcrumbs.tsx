import { Link, useLocation } from "react-router-dom";
import "./breadcrumbs.scss";

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumbs">
      <ol className="breadcrumbs-list">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {paths.map((path, index) => {
          const routeTo = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          return (
            <li
              key={routeTo}
              className={`breadcrumb-item ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {isLast ? (
                path.includes("E") ? (
                  path
                    .slice(3, 6)
                    .replace("E", "Episode ")
                    .replace("S", "Season ")
                ) : (
                  path.replace("E", "Episode ").replace("S", "Season ")
                )
              ) : (
                <Link to={routeTo}>{path}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
