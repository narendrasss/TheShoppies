import React from 'react'
import styled from 'styled-components'

const TabsContext = React.createContext<TTabContext>({} as TTabContext)

type TTabContext = {
  selected: string
  onSelect: (tabName: string) => void
}

export default function Tabs({
  selected,
  onSelect,
  children,
}: TTabContext & { children: React.ReactNode }) {
  return (
    <div className="Polaris-Tabs__Wrapper">
      <ul className="Polaris-Tabs Polaris-Tabs--fitted" role="tablist">
        <TabsContext.Provider value={{ selected, onSelect }}>
          {children}
        </TabsContext.Provider>
      </ul>
    </div>
  )
}

function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const { selected, onSelect } = React.useContext(TabsContext)
  return (
    <TabWrapper
      className="Polaris-Tabs__TabContainer"
      role="presentation"
      style={selected === id ? { boxShadow: `0 0.3rem 0 0 #5c6ac4` } : {}}
    >
      <TabButton
        onClick={() => onSelect(id)}
        role="tab"
        type="button"
        tabIndex={0}
        className="Polaris-Tabs__Tab Polaris-Tabs__Tab--selected"
        aria-selected={selected === id}
      >
        {children}
      </TabButton>
    </TabWrapper>
  )
}

Tabs.Tab = Tab

const TabWrapper = styled.li`
  position: relative;
  padding: 0.8rem 1.6rem;
`

const TabButton = styled.button`
  width: 100%;
  height: 100%;
`
