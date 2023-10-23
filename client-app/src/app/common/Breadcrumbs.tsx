import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, RouteObject, useMatches } from "react-router-dom";

/** Work ongoing. */
export default function CustomBreadcrumbs() {
  
    const matches: RouteObject[] = useMatches();

    const crumbs = matches
        .filter((match) => match.handle?.crumb)
        .map((match) => match.handle.crumb(match))

    const breadcrumbs = crumbs.map((crumb, i) => 
        <Link to={crumb.props.to} key={i}>{crumb.props.children}</Link>
    );

    return (
        <Breadcrumbs 
            separator='>'
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
}