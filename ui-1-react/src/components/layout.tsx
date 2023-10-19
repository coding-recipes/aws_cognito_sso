

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <div className='app-layout'>
      <LayoutHeader />
      <LayoutContent children={children} />
      {/* <LayoutFooter /> */}
    </div>
  </>
}

export const LayoutHeader = () => {
  return <>
    <div className='layout-header'>
      <h1>Header</h1>
    </div>
  </>
}

export const LayoutFooter = () => {
  return <>
    <div className='layout-footer'>
      <h1>Footer</h1>
    </div>
  </>
}

export const LayoutContent = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <div className='layout-content'>
      {children}
    </div>
  </>
}


