import './App.css';
import React, { useState } from 'react';
import {
    AppShell,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme, Textarea, Button, Switch,
} from '@mantine/core';

import NavbarHead from "./components/Navbar/NavbarHead";
import {Link, Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Connexion from "./pages/Connexion/Connexion";

function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
  return (
      <>
          <AppShell
              styles={{
                  main: {
                      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                  },
              }}
              navbarOffsetBreakpoint="sm"
              asideOffsetBreakpoint="sm"
              fixed
              navbar={
                <NavbarHead opened = {opened}/>
              }
              aside={
                  <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                          <Text>Application sidebar</Text>
                      </Aside>
                  </MediaQuery>
              }
              footer={
                  <Footer height={60} p="md">
                      <Link to="/connexion">connexion</Link>
                  </Footer>
              }
              header={
                  <Header height={70} p="md">
                      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                              <Burger
                                  opened={opened}
                                  onClick={() => setOpened((o) => !o)}
                                  size="sm"
                                  color={theme.colors.gray[6]}
                                  mr="xl"
                              />
                          </MediaQuery>

                          <Text>Application header</Text>
                      </div>
                  </Header>
              }
          >
<div>
    <Routes>

        <Route path='/' exact component={Home} />
        <Route path='/connexion' component={Connexion} />

    </Routes>
</div>
          </AppShell>
      </>
  );
}

export default App;
