import { shallow, createLocalVue } from 'vue-test-utils'
import { HTTP } from '../../../../src/http-common.js';
import Vuex from 'vuex';
import EditRelease from '../../../../src/components/Releases/EditRelease.vue';
import sinon from 'sinon';

describe('On Edit Release', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const sandbox = sinon.createSandbox();
  let state;
  let actions;
  let store;
  
  beforeEach(() => {
    state = {
      auth: {
        token: '12345',
        userId: '1',
      },
    };

    store = new Vuex.Store({
      state,
    });

  });

  afterEach(() => {
    sandbox.reset();
    sandbox.restore();
  });

  it('should mount and get release information correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'get').resolves({ data: { name: 'ProjectName', description: 'ProjectDescription', isScoring: true } });
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditRelease, {store, localVue, mocks: {$route, $router} });
    
    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-release')).to.be.truthy;
      done();
    });
  });

  it('should edit a release correctly', (done) => {
    let httpStub = sandbox.stub(HTTP, 'patch').resolves({data: 200});
    const $route = {
      params: {id: "2"}
    }
    const $router = {
      push: sandbox.stub()
    }
    const wrapper = shallow(EditRelease, {store, localVue, mocks: {$route, $router} });
    wrapper.vm.editRelease();
    expect(httpStub.called).to.be.true
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('edited-release')).to.be.truthy;
      done();
    });
  });

});