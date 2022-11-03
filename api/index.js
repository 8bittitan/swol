var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, {
      context: remixContext,
      url: request.url
    }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_react5 = require("@remix-run/react"), import_node2 = require("@remix-run/node");

// app/utils/auth.server.ts
var import_remix_auth = require("remix-auth"), import_remix_auth_form = require("remix-auth-form"), import_remix_auth_google = require("remix-auth-google");

// app/env.ts
var import_tiny_invariant = __toESM(require("tiny-invariant"));
(0, import_tiny_invariant.default)(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID must be set");
(0, import_tiny_invariant.default)(process.env.GOOGLE_CLIENT_SECRET, "GOOGLE_CLIENT_SECRET must be set");
(0, import_tiny_invariant.default)(process.env.GOOGLE_CALLBACK_URL, "GOOGLE_CALLBACK_URL must be set");
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

// app/utils/session.server.ts
var import_node = require("@remix-run/node"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
(0, import_tiny_invariant2.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
});

// app/models/user.server.ts
var import_argon2 = __toESM(require("argon2"));

// app/utils/db.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db__ || (global.__db__ = new import_client.PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query"
    }
  ]
})), prisma = global.__db__, prisma.$connect();

// app/models/user.server.ts
var createUser = async (email, password) => {
  try {
    let hashedPassword = await import_argon2.default.hash(password);
    return await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword
      }
    });
  } catch (err) {
    throw err;
  }
}, findByCredentials = async (email, password) => {
  var _a, _b, _c;
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase()
      },
      include: {
        profile: !0
      }
    });
    return !user || !await import_argon2.default.verify(user.password ?? "", password) ? null : {
      id: user.id,
      email: user.email,
      displayName: (_a = user.profile) == null ? void 0 : _a.displayName,
      name: (_b = user.profile) == null ? void 0 : _b.name,
      avatar: (_c = user.profile) == null ? void 0 : _c.avatar
    };
  } catch (err) {
    return console.error(err), null;
  }
}, findOrCreateByProfile = async (profile) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    let {
      emails,
      displayName,
      name: { familyName },
      photos
    } = profile, [email] = emails || [{ value: "" }], existingUser = await prisma.user.findUnique({
      where: { email: email.value },
      include: {
        profile: !0
      }
    });
    if (existingUser)
      return {
        id: existingUser.id,
        email: existingUser.email,
        displayName: ((_a = existingUser.profile) == null ? void 0 : _a.displayName) ?? null,
        name: ((_b = existingUser.profile) == null ? void 0 : _b.name) ?? null,
        avatar: ((_c = existingUser.profile) == null ? void 0 : _c.avatar) ?? null
      };
    let newUser = await prisma.user.create({
      data: {
        email: email.value,
        profile: {
          create: {
            displayName,
            name: familyName,
            avatar: photos[0].value
          }
        }
      },
      include: {
        profile: !0
      }
    });
    return {
      id: newUser.id,
      email: newUser.email,
      displayName: (_d = newUser.profile) == null ? void 0 : _d.displayName,
      name: (_e = newUser.profile) == null ? void 0 : _e.name,
      avatar: (_f = newUser.profile) == null ? void 0 : _f.avatar
    };
  } catch (error) {
    throw console.error(error), error;
  }
};

// app/utils/auth.server.ts
var authenticator = new import_remix_auth.Authenticator(sessionStorage);
authenticator.use(
  new import_remix_auth_form.FormStrategy(async ({ form }) => {
    var _a, _b;
    let email = (_a = form.get("email")) == null ? void 0 : _a.toString(), password = (_b = form.get("password")) == null ? void 0 : _b.toString();
    return !email || !password ? null : await findByCredentials(email, password);
  }),
  "credentials"
);
authenticator.use(
  new import_remix_auth_google.GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL
    },
    async ({ profile }) => await findOrCreateByProfile(profile)
  ),
  "google"
);

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-WJIQGPOF.css";

// app/components/Layout/Layout.tsx
var import_react4 = require("@remix-run/react");

// app/components/Container.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Container = ({
  children,
  classes = ""
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
  className: "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ".concat(classes),
  children
}, void 0, !1, {
  fileName: "app/components/Container.tsx",
  lineNumber: 11,
  columnNumber: 3
}, this), Container_default = Container;

// app/components/Nav/Nav.tsx
var import_react2 = require("@remix-run/react"), import_react3 = require("@headlessui/react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Nav = ({ user }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
  className: "bg-gray-100",
  "data-test": "navigation",
  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, {
    classes: "flex h-16 items-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Link, {
        to: user ? "/dashboard" : "/",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
          className: "text-lg font-semibold",
          children: "SWOL \u{1F4AA}"
        }, void 0, !1, {
          fileName: "app/components/Nav/Nav.tsx",
          lineNumber: 18,
          columnNumber: 11
        }, this)
      }, void 0, !1, {
        fileName: "app/components/Nav/Nav.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
        className: "ml-auto",
        children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "relative flex items-center",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Link, {
              to: "/dashboard",
              children: "Dashboard"
            }, void 0, !1, {
              fileName: "app/components/Nav/Nav.tsx",
              lineNumber: 24,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react3.Menu, {
              as: "div",
              className: "relative ml-3 h-8",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react3.Menu.Button, {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                      className: "sr-only",
                      children: "Open user menu"
                    }, void 0, !1, {
                      fileName: "app/components/Nav/Nav.tsx",
                      lineNumber: 28,
                      columnNumber: 19
                    }, this),
                    user.avatar ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                      className: "h-8 w-8 rounded-full",
                      src: user.avatar,
                      alt: ""
                    }, void 0, !1, {
                      fileName: "app/components/Nav/Nav.tsx",
                      lineNumber: 30,
                      columnNumber: 21
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                      children: user.email
                    }, void 0, !1, {
                      fileName: "app/components/Nav/Nav.tsx",
                      lineNumber: 36,
                      columnNumber: 21
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/components/Nav/Nav.tsx",
                  lineNumber: 27,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react3.Menu.Items, {
                  className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react3.Menu.Item, {
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                        className: "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                        children: "Settings"
                      }, void 0, !1, {
                        fileName: "app/components/Nav/Nav.tsx",
                        lineNumber: 42,
                        columnNumber: 21
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/components/Nav/Nav.tsx",
                      lineNumber: 41,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react3.Menu.Item, {
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Link, {
                        className: "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                        to: "/auth/logout",
                        children: "Logout"
                      }, void 0, !1, {
                        fileName: "app/components/Nav/Nav.tsx",
                        lineNumber: 47,
                        columnNumber: 21
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/components/Nav/Nav.tsx",
                      lineNumber: 46,
                      columnNumber: 19
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/components/Nav/Nav.tsx",
                  lineNumber: 40,
                  columnNumber: 17
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/components/Nav/Nav.tsx",
              lineNumber: 26,
              columnNumber: 15
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/components/Nav/Nav.tsx",
          lineNumber: 23,
          columnNumber: 13
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, {
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Link, {
              to: "/join",
              className: "mr-4",
              children: "Join"
            }, void 0, !1, {
              fileName: "app/components/Nav/Nav.tsx",
              lineNumber: 59,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.Link, {
              to: "/login",
              children: "Login"
            }, void 0, !1, {
              fileName: "app/components/Nav/Nav.tsx",
              lineNumber: 62,
              columnNumber: 15
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/components/Nav/Nav.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: "app/components/Nav/Nav.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/Nav/Nav.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this)
}, void 0, !1, {
  fileName: "app/components/Nav/Nav.tsx",
  lineNumber: 15,
  columnNumber: 5
}, this), Nav_default = Nav;

// app/components/Layout/Layout.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function Layout({
  user,
  isInDashboard
}) {
  return isInDashboard ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
    fileName: "app/components/Layout/Layout.tsx",
    lineNumber: 18,
    columnNumber: 12
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Nav_default, {
        user
      }, void 0, !1, {
        fileName: "app/components/Layout/Layout.tsx",
        lineNumber: 23,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, {
        classes: "mt-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
          fileName: "app/components/Layout/Layout.tsx",
          lineNumber: 25,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/components/Layout/Layout.tsx",
        lineNumber: 24,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/Layout/Layout.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}

// app/root.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), links = () => [
  { href: tailwind_default, rel: "stylesheet" }
], meta = () => ({
  charset: "utf-8",
  title: "Screamo Stack",
  viewport: "width=device-width,initial-scale=1"
});
async function loader({ request }) {
  let user = await authenticator.isAuthenticated(request);
  return (0, import_node2.json)({ user });
}
function App() {
  let { user } = (0, import_react5.useLoaderData)(), isInDashboard = (0, import_react5.useMatches)().some(
    (match) => match.pathname.includes("dashboard")
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
    lang: "en",
    className: "h-full",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.Meta, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 46,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.Links, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 47,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", {
        className: "h-full",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layout, {
            user,
            isInDashboard
          }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 50,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.ScrollRestoration, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 51,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.Scripts, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 52,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react5.LiveReload, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 53,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}

// app/routes/auth/google.tsx
var google_exports = {};
__export(google_exports, {
  loader: () => loader2
});
var loader2 = ({ request }) => authenticator.authenticate("google", request);

// app/routes/auth/google/callback.tsx
var callback_exports = {};
__export(callback_exports, {
  loader: () => loader3
});
var loader3 = ({ request }) => authenticator.authenticate("google", request, {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
});

// app/routes/auth/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  loader: () => loader4
});
var loader4 = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/login" });
};

// app/routes/widgets/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => DashboardIndex,
  loader: () => loader5
});
var import_node4 = require("@remix-run/node"), import_react6 = require("@remix-run/react");

// app/http.server.ts
var import_node3 = require("@remix-run/node");
var requiresUser = async (req) => {
  try {
    let user = await authenticator.isAuthenticated(req, {
      failureRedirect: "/login"
    });
    if (!user)
      throw (0, import_node3.redirect)("/login");
    return user;
  } catch (err) {
    throw console.error(err), (0, import_node3.redirect)("/login");
  }
};

// app/schemas/widget.server.ts
var import_zod = __toESM(require("zod")), createWidgetSchema = import_zod.default.object({
  title: import_zod.default.string(),
  description: import_zod.default.string(),
  userId: import_zod.default.string()
});

// app/models/widget.server.ts
var widgetsForUser = async (userId) => await prisma.widget.findMany({
  where: {
    userId
  }
}), getWidgetForUser = async (widgetId, userId) => {
  try {
    return await prisma.widget.findFirst({
      where: {
        id: widgetId,
        userId
      }
    });
  } catch (err) {
    return console.log(err), null;
  }
}, createWidget = async (widgetParams) => {
  try {
    let data = createWidgetSchema.parse(widgetParams);
    return await prisma.widget.create({
      data
    });
  } catch (err) {
    throw console.error(err), err;
  }
}, deleteWidget = async (widgetId, userId) => {
  try {
    let widget = await getWidgetForUser(widgetId, userId);
    if (!widget)
      throw new Error("Not authorized to delete this widget");
    return await prisma.widget.delete({
      where: {
        id: widget.id
      }
    }), !0;
  } catch (err) {
    throw console.error(err), err;
  }
};

// app/routes/widgets/$id.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), loader5 = async ({ request, params }) => {
  let user = await requiresUser(request), widgetId = params.id, widget = await getWidgetForUser(widgetId, user.id);
  return widget ? (0, import_node4.json)({
    widget
  }) : (0, import_node4.redirect)("/dashboard");
};
function DashboardIndex() {
  let { widget } = (0, import_react6.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
        className: "text-xl font-bold mb-8",
        children: widget.title
      }, void 0, !1, {
        fileName: "app/routes/widgets/$id.tsx",
        lineNumber: 34,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
        children: widget.description
      }, void 0, !1, {
        fileName: "app/routes/widgets/$id.tsx",
        lineNumber: 35,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/widgets/$id.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}

// app/routes/widgets/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action,
  default: () => WidgetsNew
});
var import_node5 = require("@remix-run/node");
var import_react8 = require("@remix-run/react");

// app/components/Input.tsx
var import_react7 = require("react"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), Input = (0, import_react7.forwardRef)(
  ({ name, label, id, error, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
        htmlFor: id || name,
        className: "block text-sm font-medium text-gray-700",
        children: label
      }, void 0, !1, {
        fileName: "app/components/Input.tsx",
        lineNumber: 12,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mt-1",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
            ref,
            id: id || name,
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
            "aria-invalid": error ? !0 : void 0,
            "aria-describedby": error ? `${name}-error` : "",
            name,
            ...props
          }, void 0, !1, {
            fileName: "app/components/Input.tsx",
            lineNumber: 19,
            columnNumber: 9
          }, this),
          error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "pt-1 text-red-700",
            id: `${name}-error`,
            children: error
          }, void 0, !1, {
            fileName: "app/components/Input.tsx",
            lineNumber: 29,
            columnNumber: 11
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/components/Input.tsx",
        lineNumber: 18,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/components/Input.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this)
);
Input.displayName = "Input";
var Input_default = Input;

// app/routes/widgets/new.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), action = async ({ request }) => {
  let user = await requiresUser(request);
  try {
    let formData = await request.formData(), widgetData = Object.fromEntries(formData), widget = await createWidget({ ...widgetData, userId: user.id });
    return widget.id ? (0, import_node5.redirect)(`/widgets/${widget.id}`) : (0, import_node5.json)({ error: "Could not create widget" });
  } catch (err) {
    return console.error(err), (0, import_node5.json)({ error: "Something went wrong" });
  }
};
function WidgetsNew() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react8.Form, {
      method: "post",
      className: "mx-auto max-w-2xl pt-8 flex flex-col space-y-6",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
          className: "font-semibold text-xl",
          children: "Create a new Widget"
        }, void 0, !1, {
          fileName: "app/routes/widgets/new.tsx",
          lineNumber: 38,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input_default, {
          type: "text",
          name: "title",
          label: "Widget Title",
          required: !0
        }, void 0, !1, {
          fileName: "app/routes/widgets/new.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input_default, {
          type: "text",
          name: "description",
          label: "Widget Description",
          required: !0
        }, void 0, !1, {
          fileName: "app/routes/widgets/new.tsx",
          lineNumber: 40,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
          type: "submit",
          className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
          children: "Create Widget"
        }, void 0, !1, {
          fileName: "app/routes/widgets/new.tsx",
          lineNumber: 47,
          columnNumber: 9
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/widgets/new.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/widgets/new.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard.tsx
var dashboard_exports = {};
__export(dashboard_exports, {
  default: () => Dashboard,
  loader: () => loader6
});
var import_react9 = require("@headlessui/react"), import_node6 = require("@remix-run/node"), import_react10 = require("@remix-run/react"), import_outline = require("@heroicons/react/24/outline"), import_classnames = __toESM(require("classnames"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
async function loader6({ request }) {
  let user = await requiresUser(request);
  return (0, import_node6.json)({ user });
}
var NavItem = ({ path, children }) => {
  let getClasses = (isActive) => (0, import_classnames.default)(
    "flex items-center gap-4 px-4 py-2 rounded-md hover:bg-gray-900 transition-colors",
    { "bg-gray-900": isActive }
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.NavLink, {
    to: path,
    end: !0,
    children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
      className: getClasses(isActive),
      children
    }, void 0, !1, {
      fileName: "app/routes/dashboard.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
};
function Dashboard() {
  let { user } = (0, import_react10.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
    className: "grid grid-cols-[350px_1fr] h-screen",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
        className: "bg-gray-800 text-white",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "bg-gray-900 p-6 mb-4",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
              className: "text-2xl",
              children: "SWOL \u{1F4AA}"
            }, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 40,
              columnNumber: 11
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 39,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "flex flex-col gap-4 p-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavItem, {
                path: "/dashboard",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.RectangleGroupIcon, {
                    className: "h-9 w-9"
                  }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 45,
                    columnNumber: 13
                  }, this),
                  " Dashboard"
                ]
              }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 44,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavItem, {
                path: "exercises",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.FireIcon, {
                    className: "h-9 w-9"
                  }, void 0, !1, {
                    fileName: "app/routes/dashboard.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                  }, this),
                  " Exercises"
                ]
              }, void 0, !0, {
                fileName: "app/routes/dashboard.tsx",
                lineNumber: 47,
                columnNumber: 11
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 43,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 38,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
            className: "flex justify-end p-6 shadow-lg",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react9.Menu, {
              as: "div",
              className: "relative ml-3 h-8",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react9.Menu.Button, {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                      className: "sr-only",
                      children: "Open user menu"
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 56,
                      columnNumber: 15
                    }, this),
                    user.avatar ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                      className: "h-8 w-8 rounded-full",
                      src: user.avatar,
                      alt: ""
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 58,
                      columnNumber: 17
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                      children: user.email
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 64,
                      columnNumber: 17
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 55,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react9.Menu.Items, {
                  className: "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react9.Menu.Item, {
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                        className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left",
                        children: "Settings"
                      }, void 0, !1, {
                        fileName: "app/routes/dashboard.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 69,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react9.Menu.Item, {
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.Link, {
                        className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left",
                        to: "/auth/logout",
                        children: "Logout"
                      }, void 0, !1, {
                        fileName: "app/routes/dashboard.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/dashboard.tsx",
                      lineNumber: 74,
                      columnNumber: 15
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/dashboard.tsx",
                  lineNumber: 68,
                  columnNumber: 13
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 54,
              columnNumber: 11
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 53,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "p-6 bg-gray-200 h-full",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react10.Outlet, {}, void 0, !1, {
              fileName: "app/routes/dashboard.tsx",
              lineNumber: 86,
              columnNumber: 11
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/dashboard.tsx",
            lineNumber: 85,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard.tsx",
        lineNumber: 52,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}

// app/routes/dashboard/exercises/index.tsx
var exercises_exports = {};
__export(exercises_exports, {
  default: () => ExercisesPage
});
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function ExercisesPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
    children: "Exercises Page"
  }, void 0, !1, {
    fileName: "app/routes/dashboard/exercises/index.tsx",
    lineNumber: 2,
    columnNumber: 10
  }, this);
}

// app/routes/dashboard/index.tsx
var dashboard_exports2 = {};
__export(dashboard_exports2, {
  action: () => action2,
  default: () => DashboardIndex2,
  loader: () => loader7
});
var import_node7 = require("@remix-run/node"), import_react11 = require("@remix-run/react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
async function loader7({ request }) {
  let user = await requiresUser(request), widgets = await widgetsForUser(user.id);
  return (0, import_node7.json)({
    widgets
  });
}
async function action2({ request }) {
  var _a;
  try {
    let formData = await request.formData();
    if (formData.get("_action") !== "delete")
      throw new Error("Invalid action");
    let widgetId = (_a = formData.get("widgetId")) == null ? void 0 : _a.toString();
    if (!widgetId)
      return (0, import_node7.json)({ error: "Cannot delete that Widget." });
    let user = await requiresUser(request);
    return await deleteWidget(widgetId, user.id), !0;
  } catch (err) {
    return console.error(err), (0, import_node7.json)({ error: "Cannot delete that Widget." });
  }
}
function DashboardIndex2() {
  let data = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
        className: "text-xl font-bold mb-8",
        children: "Widgets"
      }, void 0, !1, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 50,
        columnNumber: 7
      }, this),
      data.widgets.length < 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
        children: [
          "You have no widgets yet! ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react11.Link, {
            to: "/widgets/new",
            children: "Click here"
          }, void 0, !1, {
            fileName: "app/routes/dashboard/index.tsx",
            lineNumber: 53,
            columnNumber: 36
          }, this),
          " to create one now!"
        ]
      }, void 0, !0, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
        children: data.widgets.map((widget) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
          className: "mb-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
              className: "text-lg font-semibold mb-2",
              children: widget.title
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 60,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              children: widget.description
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 61,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react11.Link, {
              to: `/widgets/${widget.id}`,
              rel: "prefetch",
              children: "View"
            }, void 0, !1, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 62,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react11.Form, {
              method: "post",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                  type: "hidden",
                  name: "_action",
                  value: "delete"
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/index.tsx",
                  lineNumber: 67,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                  type: "hidden",
                  name: "widgetId",
                  value: widget.id
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/index.tsx",
                  lineNumber: 68,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
                  type: "submit",
                  className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
                  children: "Delete"
                }, void 0, !1, {
                  fileName: "app/routes/dashboard/index.tsx",
                  lineNumber: 69,
                  columnNumber: 15
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/dashboard/index.tsx",
              lineNumber: 66,
              columnNumber: 13
            }, this)
          ]
        }, widget.id, !0, {
          fileName: "app/routes/dashboard/index.tsx",
          lineNumber: 59,
          columnNumber: 11
        }, this))
      }, void 0, !1, {
        fileName: "app/routes/dashboard/index.tsx",
        lineNumber: 57,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/dashboard/index.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});
var import_react12 = require("@remix-run/react");

// app/assets/our_last_night.jpg
var our_last_night_default = "/build/_assets/our_last_night-IVMASJGI.jpg";

// app/routes/index.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
    className: "relative min-h-screen sm:flex sm:justify-center sm:pt-12",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "relative sm:pb-16 sm:pt-8",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "relative shadow-xl sm:overflow-hidden sm:rounded-2xl",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "absolute inset-0",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                  className: "h-full w-full object-cover",
                  src: our_last_night_default,
                  alt: "Our Last Night performing"
                }, void 0, !1, {
                  fileName: "app/routes/index.tsx",
                  lineNumber: 12,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                  className: "absolute inset-0 bg-red-600 mix-blend-multiply"
                }, void 0, !1, {
                  fileName: "app/routes/index.tsx",
                  lineNumber: 17,
                  columnNumber: 15
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/index.tsx",
              lineNumber: 11,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
                  className: "text-center text-6xl font-extrabold tracking-tight sm:text-8xl",
                  "data-test": "home__title",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                    className: "block uppercase text-red-500 drop-shadow-md",
                    children: "Screamo Stack"
                  }, void 0, !1, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/index.tsx",
                  lineNumber: 20,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                  className: "mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl",
                  children: "Check the README.md file for instructions on how to get this project deployed."
                }, void 0, !1, {
                  fileName: "app/routes/index.tsx",
                  lineNumber: 28,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                  className: "mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                    className: "space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react12.Link, {
                        to: "/join",
                        className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-blue-50 sm:px-8",
                        "data-test": "home__join",
                        children: "Sign up"
                      }, void 0, !1, {
                        fileName: "app/routes/index.tsx",
                        lineNumber: 34,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react12.Link, {
                        to: "/login",
                        className: "flex items-center justify-center rounded-md bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600  ",
                        children: "Log In"
                      }, void 0, !1, {
                        fileName: "app/routes/index.tsx",
                        lineNumber: 41,
                        columnNumber: 19
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 33,
                    columnNumber: 17
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/index.tsx",
                  lineNumber: 32,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
                  href: "https://remix.run",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                    src: "https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg",
                    alt: "Remix",
                    className: "mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                  }, void 0, !1, {
                    fileName: "app/routes/index.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/index.tsx",
                  lineNumber: 49,
                  columnNumber: 15
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/index.tsx",
              lineNumber: 19,
              columnNumber: 13
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 10,
          columnNumber: 11
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 8,
      columnNumber: 7
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action3,
  default: () => Login,
  meta: () => meta2
});
var import_react13 = require("@remix-run/react"), import_react14 = __toESM(require("react"));
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), meta2 = () => ({
  title: "Login"
}), action3 = async ({ request, context }) => {
  await authenticator.authenticate("credentials", request, {
    context,
    successRedirect: "/dashboard",
    throwOnError: !0,
    failureRedirect: "/login"
  });
};
function Login() {
  var _a, _b;
  let actionData = (0, import_react13.useActionData)(), emailRef = import_react14.default.useRef(null), passwordRef = import_react14.default.useRef(null);
  return import_react14.default.useEffect(() => {
    var _a2, _b2, _c, _d;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email ? (_b2 = emailRef.current) == null || _b2.focus() : (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password && ((_d = passwordRef.current) == null || _d.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "flex min-h-full flex-col justify-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto w-full max-w-md px-8 mt-8 mb-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react13.Form, {
          action: "/auth/google",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            type: "submit",
            className: "flex justify-center w-full py-4 bg-slate-700 hover:bg-slate-800 text-white rounded-md",
            children: "Sign in with Google"
          }, void 0, !1, {
            fileName: "app/routes/login.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 46,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 45,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto w-full max-w-md px-8 mb-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {
          className: "border-black"
        }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 57,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 56,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto w-full max-w-md px-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react13.Form, {
          method: "post",
          className: "space-y-6",
          noValidate: !0,
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input_default, {
              label: "Email address",
              name: "email",
              id: "email",
              type: "email",
              required: !0,
              ref: emailRef,
              error: (_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email,
              autoFocus: !0
            }, void 0, !1, {
              fileName: "app/routes/login.tsx",
              lineNumber: 62,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input_default, {
              label: "Password",
              name: "password",
              id: "password",
              type: "password",
              required: !0,
              ref: emailRef,
              error: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.password
            }, void 0, !1, {
              fileName: "app/routes/login.tsx",
              lineNumber: 73,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
              type: "submit",
              className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
              children: "Log in"
            }, void 0, !1, {
              fileName: "app/routes/login.tsx",
              lineNumber: 83,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "flex items-center justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                  className: "flex items-center",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                      id: "remember",
                      name: "remember",
                      type: "checkbox",
                      className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 91,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
                      htmlFor: "remember",
                      className: "ml-2 block text-sm text-gray-900",
                      children: "Remember me"
                    }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 97,
                      columnNumber: 15
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 90,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                  className: "text-center text-sm text-gray-500",
                  children: [
                    "Don't have an account?",
                    " ",
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react13.Link, {
                      className: "text-blue-500 underline",
                      to: "/join",
                      children: "Sign up"
                    }, void 0, !1, {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 106,
                      columnNumber: 15
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 104,
                  columnNumber: 13
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/login.tsx",
              lineNumber: 89,
              columnNumber: 11
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 61,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 60,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action4,
  default: () => Join
});
var import_node8 = require("@remix-run/node"), import_react15 = require("@remix-run/react");
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), action4 = async ({ request, context }) => {
  var _a, _b;
  let req = Object.assign({}, request), form = await request.formData(), email = (_a = form.get("email")) == null ? void 0 : _a.toString(), password = (_b = form.get("password")) == null ? void 0 : _b.toString();
  if (!email || !password)
    return (0, import_node8.json)({
      error: "Missing email or password"
    });
  try {
    return await createUser(email, password), await authenticator.authenticate("credentials", req, {
      context,
      throwOnError: !0,
      successRedirect: "/sites"
    });
  } catch (err) {
    return (0, import_node8.json)({
      error: err.message
    });
  }
};
function Join() {
  let actionData = (0, import_react15.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "flex min-h-full flex-col justify-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto w-full max-w-md px-8 mt-8 mb-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react15.Form, {
          action: "/auth/github",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            type: "submit",
            className: "flex justify-center w-full py-4 bg-slate-700 hover:bg-slate-800 text-white rounded-md",
            children: "Sign in with Github"
          }, void 0, !1, {
            fileName: "app/routes/join.tsx",
            lineNumber: 51,
            columnNumber: 11
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 50,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/join.tsx",
        lineNumber: 49,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto w-full max-w-md px-8 mb-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {
          className: "border-black"
        }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 61,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/join.tsx",
        lineNumber: 60,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "mx-auto w-full max-w-md px-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react15.Form, {
          method: "post",
          className: "space-y-6",
          noValidate: !0,
          children: [
            (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
              children: actionData.error
            }, void 0, !1, {
              fileName: "app/routes/join.tsx",
              lineNumber: 66,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input_default, {
              label: "Email address",
              name: "email",
              id: "email",
              type: "email",
              required: !0,
              autoFocus: !0
            }, void 0, !1, {
              fileName: "app/routes/join.tsx",
              lineNumber: 67,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input_default, {
              label: "Password",
              name: "password",
              id: "password",
              type: "password",
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/join.tsx",
              lineNumber: 78,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
              type: "submit",
              className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
              children: "Join"
            }, void 0, !1, {
              fileName: "app/routes/join.tsx",
              lineNumber: 88,
              columnNumber: 11
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/join.tsx",
          lineNumber: 65,
          columnNumber: 9
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/join.tsx",
        lineNumber: 64,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "a8f5ea15", entry: { module: "/build/entry.client-LHSRIYNB.js", imports: ["/build/_shared/chunk-HETKVTVX.js", "/build/_shared/chunk-BPQL3L3K.js", "/build/_shared/chunk-5KL4PAQL.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-QA6WLTBQ.js", imports: ["/build/_shared/chunk-5CSBWAWC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth/google": { id: "routes/auth/google", parentId: "root", path: "auth/google", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/google-BDQYWB3X.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth/google/callback": { id: "routes/auth/google/callback", parentId: "routes/auth/google", path: "callback", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/google/callback-LXZECHUO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/auth/logout": { id: "routes/auth/logout", parentId: "root", path: "auth/logout", index: void 0, caseSensitive: void 0, module: "/build/routes/auth/logout-MORH5CFF.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard": { id: "routes/dashboard", parentId: "root", path: "dashboard", index: void 0, caseSensitive: void 0, module: "/build/routes/dashboard-A7QBGP3Y.js", imports: ["/build/_shared/chunk-4RQJHZLK.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/exercises/index": { id: "routes/dashboard/exercises/index", parentId: "routes/dashboard", path: "exercises", index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/exercises/index-G432H2SJ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dashboard/index": { id: "routes/dashboard/index", parentId: "routes/dashboard", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dashboard/index-5KOYI334.js", imports: ["/build/_shared/chunk-2737AVW4.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-T3MBTDWV.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-QZCXOU3V.js", imports: ["/build/_shared/chunk-OZVJ2KGS.js", "/build/_shared/chunk-DHNXSRSB.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-2JU7OFAQ.js", imports: ["/build/_shared/chunk-OZVJ2KGS.js", "/build/_shared/chunk-DHNXSRSB.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/widgets/$id": { id: "routes/widgets/$id", parentId: "root", path: "widgets/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/widgets/$id-PUBYRCUC.js", imports: ["/build/_shared/chunk-2737AVW4.js", "/build/_shared/chunk-4RQJHZLK.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/widgets/new": { id: "routes/widgets/new", parentId: "root", path: "widgets/new", index: void 0, caseSensitive: void 0, module: "/build/routes/widgets/new-LVITEN4P.js", imports: ["/build/_shared/chunk-DHNXSRSB.js", "/build/_shared/chunk-2737AVW4.js", "/build/_shared/chunk-4RQJHZLK.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-A8F5EA15.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/auth/google": {
    id: "routes/auth/google",
    parentId: "root",
    path: "auth/google",
    index: void 0,
    caseSensitive: void 0,
    module: google_exports
  },
  "routes/auth/google/callback": {
    id: "routes/auth/google/callback",
    parentId: "routes/auth/google",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: callback_exports
  },
  "routes/auth/logout": {
    id: "routes/auth/logout",
    parentId: "root",
    path: "auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/widgets/$id": {
    id: "routes/widgets/$id",
    parentId: "root",
    path: "widgets/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/widgets/new": {
    id: "routes/widgets/new",
    parentId: "root",
    path: "widgets/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports
  },
  "routes/dashboard/exercises/index": {
    id: "routes/dashboard/exercises/index",
    parentId: "routes/dashboard",
    path: "exercises",
    index: !0,
    caseSensitive: void 0,
    module: exercises_exports
  },
  "routes/dashboard/index": {
    id: "routes/dashboard/index",
    parentId: "routes/dashboard",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: dashboard_exports2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
