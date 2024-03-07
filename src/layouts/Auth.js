// chakra imports
import { Box, ChakraProvider, Portal, useToast } from '@chakra-ui/react';

// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import theme from 'theme/theme.js';

export default function Pages(props) {
	const toast = useToast();

	const { ...rest } = props;
	// ref for the wrapper div
	const wrapper = React.createRef();
	React.useEffect(() => {
		document.body.style.overflow = 'unset';
		// Specify how to clean up after this effect:
		return function cleanup() { };
	});
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
	const getRoutes = (routes) => {
		// 从 routes 对象中获取 'account' 分类的路由数组
		const accountRoutes = routes["account"] || [];

		return accountRoutes.map((prop, key) => {
			// 检查 prop 是否有 'collapse' 或 'category' 属性，并递归处理
			if (prop.collapse) {
				return getRoutes(prop.views);
			}
			if (prop.category === 'account') {
				return getRoutes(prop.views);
			}

			// 创建 'auth' 布局的路由
			if (prop.layout === '/auth') {
				return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
			} else {
				return null;
			}
		});
	};

	const navRef = React.useRef();
	document.documentElement.dir = 'ltr';
	return (
		<ChakraProvider
			theme={theme}
			resetCss={false} w='100%'>
			<Box ref={navRef} w='100%'>
				<Portal containerRef={navRef}>
					<AuthNavbar secondary={getActiveNavbar(routes)} logoText='DIAMOND' />
				</Portal>
				<Box w='100%'>
					<Box ref={wrapper} w='100%'>
						<Switch>
							{getRoutes(routes)}
							<Route path='/auth/noAccess'/>
							<Redirect from='/admin/' to='/auth/noAccess' />
						</Switch>
					</Box>
				</Box>
				<Box px='24px' mx='auto' width='1044px' maxW='100%'>
				</Box>
			</Box>
		</ChakraProvider>
	);
}
