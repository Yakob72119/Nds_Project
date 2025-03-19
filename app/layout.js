import "./global.css";
import Providers from './components/Providers';
import SessionDebug from './components/SessionDebug';
import Navigation from './components/Navigation';

export const metadata = {
  title: "NDS Trading",
  description: "Your gateway to exceptional services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <Navigation /> */}
          <main>
            {children}
          </main>
          {process.env.NODE_ENV === 'development' && <SessionDebug />}
        </Providers>
      </body>
    </html>
  );
}
