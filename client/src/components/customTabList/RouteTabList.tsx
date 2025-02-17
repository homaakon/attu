import { Box, makeStyles, Tab, Tabs, Theme } from '@material-ui/core';
import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ITabListProps, ITabPanel } from './Types';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 0,
    flexGrow: 1,
    '& .MuiTab-wrapper': {
      textTransform: 'capitalize',
      fontWeight: 'normal',
      color: '#323232',
    },
    background: '#fff',
    border: '1px solid #e9e9ed',
    padding: theme.spacing(0, 1),
  },
  tab: {
    backgroundColor: theme.palette.primary.main,
  },
  tabContainer: {
    borderBottom: '1px solid #e0e0e0',
  },
  tabContent: {
    minWidth: 0,
    marginRight: theme.spacing(3),
  },
  tabPanel: {
    flexBasis: 0,
    flexGrow: 1,
    marginTop: theme.spacing(1),
    overflow: 'hidden',
  },
}));

const TabPanel = (props: ITabPanel) => {
  const { children, value, index, className = '', ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={className}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box height="100%">{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const RouteTabList: FC<ITabListProps> = props => {
  const { tabs, activeIndex = 0, wrapperClass = '' } = props;
  const classes = useStyles();
  const [value, setValue] = useState<number>(activeIndex);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    const newPath =
      location.pathname.split('/').slice(0, -1).join('/') +
      '/' +
      tabs[newValue].path;

    navigate(`${newPath}`);
  };

  return (
    <div className={`${classes.wrapper}  ${wrapperClass}`}>
      <Tabs
        classes={{
          indicator: classes.tab,
          flexContainer: classes.tabContainer,
        }}
        // if not provide this property, Material will add single span element by default
        TabIndicatorProps={{ children: <div className="tab-indicator" /> }}
        value={value}
        onChange={handleChange}
        aria-label="tabs"
      >
        {tabs.map((tab, index) => (
          <Tab
            classes={{ root: classes.tabContent }}
            textColor="primary"
            key={tab.label}
            label={tab.label}
            {...a11yProps(index)}
          ></Tab>
        ))}
      </Tabs>

      {tabs.map((tab, index) => (
        <TabPanel
          key={tab.label}
          value={value}
          index={index}
          className={classes.tabPanel}
        >
          {tab.component}
        </TabPanel>
      ))}
    </div>
  );
};

export default RouteTabList;
