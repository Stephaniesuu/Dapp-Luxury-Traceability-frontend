// Chakra imports
import { useContext } from 'react';
import UserContext from '../UserContext.js';
import { toast } from 'react-toastify';

import { ChakraProvider, Portal, useDisclosure } from '@chakra-ui/react';
import Configurator from 'components/Configurator/Configurator';
// Layout components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar';

import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// Custom Chakra theme
import theme from 'theme/theme.js';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
// Custom components
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import PanelContent from '../components/Layout/PanelContent';

export default function Dashboard(props) {

	const { user } = useContext(UserContext);
	const currentUserRole = user ? user.role : null;
	const { ...rest } = props;

	const [sidebarVariant, setSidebarVariant] = useState('transparent');
	const [fixed, setFixed] = useState(false);

	const roleBasedRoutes = routes[currentUserRole];

	const getRoute = () => {
		return window.location.pathname !== '/admin/full-screen-maps';
	};
	const getRoutes = (roleBasedRoutes) => {
		return roleBasedRoutes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			}
			return null;
		});
	};

	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};

	// This changes navbar state(fixed or not)
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};

	const { isOpen, onOpen, onClose } = useDisclosure();
	document.documentElement.dir = 'ltr';

	return (
		<ChakraProvider theme={theme} resetCss={false}>
			<Sidebar
				routes={routes}
				logoText={'Diamond'}
				display='none'
				sidebarVariant={sidebarVariant}
				role={currentUserRole}
				{...rest}
			/>
			<MainPanel
				w={{
					base: '100%',
					xl: 'calc(100% - 275px)'
				}}>
				<Portal>
					<AdminNavbar
						onOpen={onOpen}
						logoText={'Diamond'}
						brandText={getActiveRoute(roleBasedRoutes)}
						secondary={getActiveNavbar(roleBasedRoutes)}
						fixed={fixed}
						role={currentUserRole}
						{...rest}
					/>
				</Portal>
				{getRoute() ? (
					<PanelContent>
						<PanelContainer>
							<Switch>
								{getRoutes(roleBasedRoutes)}
								<Route path='/auth/noAccess' render={() => {
									return <Redirect to='/auth/signin' />;
								}} />
								<Redirect from='/admin/' to='/auth/noAccess' />
							</Switch>
						</PanelContainer>
					</PanelContent>
				) : null}
				<Portal>
					<FixedPlugin secondary={getActiveNavbar(roleBasedRoutes)} fixed={fixed} onOpen={onOpen} />
				</Portal>
				<Configurator
					secondary={getActiveNavbar(roleBasedRoutes)}
					isOpen={isOpen}
					onClose={onClose}
					isChecked={fixed}
					onSwitch={(value) => {
						setFixed(value);
					}}
					onOpaque={() => setSidebarVariant('opaque')}
					onTransparent={() => setSidebarVariant('transparent')}
				/>
			</MainPanel>
		</ChakraProvider>
	);
}
