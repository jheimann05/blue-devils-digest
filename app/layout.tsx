import './../styles/globals.css';
export const metadata={title:'BlueDevil Digest',description:'Starter'};
export default function RootLayout({children}:{children:React.ReactNode}){
  return(<html lang="en"><body><main className="max-w-4xl mx-auto p-6">{children}</main></body></html>);
}