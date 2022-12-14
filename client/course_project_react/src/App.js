import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BasicGrid } from './components/home.js'

//set theme 
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

/**
 * 
 * @returns Root component
 */
function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<main>
				< BasicGrid />
			</main>
		</ThemeProvider>
	);
}

export default App;
