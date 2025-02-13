import { axios } from "@pipedream/platform";

export default {
  type: "app",
  app: "loops_so",
  propDefinitions: {
    email: {
      type: "string",
      label: "Email",
      description: "Email address of the contact",
    },
    firstName: {
      type: "string",
      label: "First Name",
      description: "The first name of the contact",
      optional: true,
    },
    lastName: {
      type: "string",
      label: "Last Name",
      description: "The last name of the contact",
      optional: true,
    },
    userGroup: {
      type: "string",
      label: "User Group",
      description: "User group of the contact",
      optional: true,
    },
    customFields: {
      type: "string[]",
      label: "Custom Fields",
      description: "Custom fields to include in the contact",
      optional: true,
      reloadProps: true,
      async options() {
        const data = await this.listCustomFields();
        return data.map(({
          key,
          label,
        }) => ({
          label,
          value: key,
        }));
      },
    },
  },
  methods: {
    _baseUrl() {
      return "https://app.loops.so/api/v1";
    },
    _headers() {
      return {
        Authorization: `Bearer ${this.$auth.api_key}`,
      };
    },
    async _makeRequest({
      $ = this,
      path,
      ...args
    }) {
      return axios($, {
        url: `${this._baseUrl()}${path}`,
        headers: this._headers(),
        ...args,
      });
    },
    findContact(args = {}) {
      return this._makeRequest({
        path: "/contacts/find",
        ...args,
      });
    },
    createContact(args = {}) {
      return this._makeRequest({
        path: "/contacts/create",
        method: "POST",
        ...args,
      });
    },
    updateContact(args = {}) {
      return this._makeRequest({
        path: "/contacts/update",
        method: "PUT",
        ...args,
      });
    },
    deleteContact(args = {}) {
      return this._makeRequest({
        path: "/contacts/delete",
        method: "POST",
        ...args,
      });
    },
    sendEvent(args = {}) {
      return this._makeRequest({
        path: "/events/send",
        method: "POST",
        ...args,
      });
    },
    sendTransactionalEmail(args = {}) {
      return this._makeRequest({
        path: "/transactional",
        method: "POST",
        ...args,
      });
    },
    listCustomFields(args = {}) {
      return this._makeRequest({
        path: "/contacts/customFields",
        ...args,
      });
    },
    listMailingLists(args = {}) {
      return this._makeRequest({
        path: "/lists",
        ...args,
      });
    },
  },
};
