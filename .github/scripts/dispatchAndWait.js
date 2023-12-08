// dispatchAndWait.js

async function listWorkflowRuns(github, context) {
    try {
      const response = await github.actions.listWorkflowRuns({
        owner: context.repo.owner,
        repo: context.repo.repo,
        workflow_id: 'publish_test_data.yml', // Replace with the actual workflow ID
      });

      console.log(`list workflow runs: ${JSON.stringify(response)}`);
  
      return response.data.workflow_runs.map(run => run.id);
    } catch (error) {
      throw new Error(`Error listing workflow runs: ${error.message}`);
    }
  }
  
  async function createWorkflowDispatch(github, context) {
    try {
      const response = await github.actions.createWorkflowDispatch({
        owner: context.repo.owner,
        repo: context.repo.repo,
        workflow_id: 'publish_test_data.yml', // Replace with the actual workflow ID
        inputs: {
          name: "dev",
          datacenter: "AWS"
        },
      });
  
      if (response.status !== 204) {
        throw new Error(`Failed to dispatch workflow. Status: ${response.status}`);
      }
  
      return response.data.workflow.id; // Return the workflow ID for later use
    } catch (error) {
      throw new Error(`Error dispatching workflow: ${error.message}`);
    }
  }
  
  async function waitAndCheckNewJob(github, context, initialRunIds) {
    try {
      await new Promise(resolve => setTimeout(resolve, 10)); // Wait for 10 milliseconds
  
      let newRunIds = initialRunIds;
  
      while (newRunIds.length === initialRunIds.length) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
  
        const currentRunIds = await listWorkflowRuns(github, context);
        newRunIds = currentRunIds.filter(id => !initialRunIds.includes(id));
      }
  
      return newRunIds;
    } catch (error) {
      throw new Error(`Error waiting for new job: ${error.message}`);
    }
  }
  
  async function waitForCompletion(github, context, runId) {
    try {
      console.log(`Waiting for the workflow run (${runId}) to complete...`);
      let status = "";
  
      while (status !== "completed") {
        const run = await github.actions.getWorkflowRun({
          owner: context.repo.owner,
          repo: context.repo.repo,
          run_id: runId,
        });
  
        status = run.data.status;
        console.log(`Current status: ${status}`);
  
        if (status !== "completed") {
          await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
        }
      }
    } catch (error) {
      throw new Error(`Error waiting for workflow completion: ${error.message}`);
    }
  }
  
  module.exports = {
    listWorkflowRuns,
    createWorkflowDispatch,
    waitAndCheckNewJob,
    waitForCompletion,
  };
  