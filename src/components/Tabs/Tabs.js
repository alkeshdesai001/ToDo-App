import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TabsComp = ({tab, setTab, tabs}) => (
    <Paper square>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(e, i)=> setTab(i)}
        aria-label="disabled tabs example"
      >
      {tabs.map(tab=> <Tab label={tab} key={tab} />)}
      </Tabs>
    </Paper>
  );

export default TabsComp