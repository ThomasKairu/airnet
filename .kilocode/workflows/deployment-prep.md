# Deployment Preparation Workflow

Prepare code for deployment to this project's environments:

## Step 1: Pre-Deployment Validation
1. Use `execute_command` to run project's full test suite
2. Execute project-specific linting and formatting checks
3. Run any custom validation scripts for this project
4. Check that all environment variables are properly configured

## Step 2: Environment-Specific Checks
1. Use `read_file` to verify environment configurations match requirements
2. Check database migration scripts are ready
3. Validate any third-party service configurations
4. Ensure monitoring and logging are properly configured

## Step 3: Staging Deployment
1. Deploy to staging environment using `execute_command`
2. Run smoke tests against staging
3. Verify all integrations work in staging environment
4. Test any data migration procedures

## Step 4: Production Readiness
Ask the user to confirm:
- Are all stakeholders aware of the deployment?
- Is the rollback procedure tested and ready?
- Are monitoring dashboards configured?
- Is the deployment scheduled for appropriate time?

## Step 5: Post-Deployment Tasks
Plan for after deployment:
- Monitor application metrics
- Check error logs for any issues
- Verify user-facing functionality
- Communicate deployment status to stakeholders