# useCookie

A hook for storing, updating and deleting values into [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore).

### 💡 Why?

- A quick way to use the `CookieStore` in your React components.

### Basic Usage:

```jsx harmony
import React, { useCallback } from 'react'; 
import { Pill, Paragraph, Icon } from 'beautiful-react-ui';
import { useCookie } from 'beautiful-react-hooks'; 

const CookieExample = () => {
  const [value, updateValue, deleteValue] = useCookie('demo-cookies');
  
  const updateButtonClicked = useCallback(()=> {
      updateValue('cookie updated')
  })
  const deleteButtonClicked = useCallback(() => {
    deleteValue()
  });
  return (
    <DisplayDemo>
        <Paragraph>Click on the button to update or clear from the cookieStore</Paragraph>
        <Paragraph>{value? value: null}</Paragraph>
        <Pill color='primary' onClick={updateButtonClicked}>
          <Icon name="envelope" />
          update the cookieStore
        </Pill>
        <Pill color='primary' onClick={deleteButtonClicked}>
          <Icon name="envelope" />
          Clear the cookieStore
        </Pill>
    </DisplayDemo>
  )
};

<CookieExample />
```

### Mastering the hooks

#### ✅ When to use
 
- When you need to get/set values from the `cookieStore` 

#### 🛑 When not to use

- This hook(cookieStore) can't be used in server-side and http website.
