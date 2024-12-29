type PoissonParameters = {
  p_0: number;
  a: number;
  k: number;
};

/**
 * ## Productivity - p(t)
 *
 * Models the productivity of a person as a function of time t.
 *
 *  */
const fn_productivity = (t: number, params: PoissonParameters) => {
  const { p_0, a, k } = params;
  return p_0 + a * t * Math.exp(-k * t);
};

type TaskParameters = {
  E: number; // Effort of the task, [1, 5]
  beta: number; // Enjoyability of the task, [1, 2]
};

type PhiParams = {
  c1: number;
  c2: number;
  c3: number;
};

/**
 * ## Flow Rise Time - phi(E, beta)
 * Models the time it takes to reach the flow state as a function of the effort of the task E and the enjoyability of the task beta.
 *
 *
 * phi(E, beta) = c1 * E + c2 * beta + c3
 *  */
const fn_phi = (productivityParams: TaskParameters, params: PhiParams) => {
  const { c1, c2, c3 } = params;
  const { E, beta } = productivityParams;
  return c1 * E + c2 * beta + c3;
};

/**
 * ## Initial Productivity - p(0)
 *
 * Args:
 * - E, the effort of the task
 * - beta, the enjoyability of the task
 *
 * Estimated as p_0 = beta^2 / E^2,
 * the more we enjoy the task, the higher the initial productivity.
 * the more effort a task requires, the lower the initial productivity.
 *
 *  */
const initial_productivity = (productivityParams: TaskParameters) => {
  const { E, beta } = productivityParams;
  return Math.pow(beta, 2) / Math.pow(E, 2);
};

/**
 * ## Peak Productivity - p_max(E, beta)
 *
 * Args:
 * - E, the effort of the task
 * - beta, the enjoyability of the task
 *
 * Heuristic:
 * - Higher effort tasks, that we really enjoy correspond to a higher peak productivity.
 * - However, the marginal increase in productivity decreases as the effort increases.
 *
 * Thus, a reasonable model is
 * a = beta^2 * ln(E) + beta^2
 *
 *  */
const peak_productivity = (productivityParams: TaskParameters) => {
  const { E, beta } = productivityParams;
  return Math.pow(beta, 2) * Math.log(E) + Math.pow(beta, 2);
};

interface TaskParameterInput {
  E_user: number; // [1, 10]
  beta_user: number; // [1, 10]
  estimatedTimeToFlow: number; // [1, 10]
}

const mapToProductivityParams = (
  userInput: TaskParameterInput
): TaskParameters => {
  // Validate input ranges
  if (userInput.E_user < 1 || userInput.E_user > 10) {
    throw new Error("E_user must be in the range [1, 10]");
  }
  if (userInput.beta_user < 1 || userInput.beta_user > 10) {
    throw new Error("beta_user must be in the range [1, 10]");
  }
  return {
    E: (4 / 9) * userInput.E_user + 5 / 9,
    beta: (1 / 9) * userInput.beta_user + 8 / 9,
  };
};

const main = async () => {
  console.log("Hello Zenith!");
  const params: PoissonParameters = {
    p_0: 0.5,
    a: 0.5,
    k: 0.5,
  };

  for (let t = 0; t <= 4; t++) {
    const productivity = fn_productivity(t, params);
    console.log(`Productivity at time ${t} is ${productivity}`);
  }

  // DEFININING THE POISSON PARAMETERS
  // Let's parameterize the function by the effort of the task E, enjoyability B and the time it takes to reach flow state phi
  // --
  // we know that the time to reach the maximum solves dp/dt=0 => t = 1/k.
  // We set this value of t equal to phi and solve for k => k = 1/phi.

  const userInput: TaskParameterInput[] = [
    {
      E_user: 1,
      beta_user: 2,
      estimatedTimeToFlow: 1,
    },
    {
      E_user: 2,
      beta_user: 4,
      estimatedTimeToFlow: 3,
    },
  ];
  const mappedParams = mapToProductivityParams(userInput[0]);

  const p0 = initial_productivity(mappedParams);
  const a = peak_productivity(mappedParams);

  console.log(`Initial Productivity: ${p0}`);
  console.log(`Peak Productivity: ${a}`);
};

main();
