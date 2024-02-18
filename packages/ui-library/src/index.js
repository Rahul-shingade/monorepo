// Import Snabbdom library
import { h, init } from 'snabbdom';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';

const patch = init([classModule, propsModule, eventListenersModule]);

function createApp(initialState, template, mountElement) {
  let state = initialState;

  function updateState(newState) {
    state = { ...state, ...newState };
    render();
  }

  function render() {
    const newVNode = template(state, updateState);
    patch(mountElement, newVNode);
  }

  render();

  return { updateState };
}

const app = createApp(
  { count: 0 },
  (state, updateState) =>
    h('div', [
      h('h1', `Count: ${state.count}`),
      h('button', { on: { click: () => updateState({ count: state.count + 1 }) } }, 'Add'),
    ]),
  document.getElementById('app')
);
