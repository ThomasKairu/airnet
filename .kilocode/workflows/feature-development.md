# Feature Development Workflow

Guide for developing new features in this project:

## Step 1: Planning Phase
Ask the user:
- What is the business requirement for this feature?
- What are the acceptance criteria?
- Are there any specific performance requirements?
- What are the security considerations for this project?

## Step 2: Technical Design
1. Review existing codebase architecture with `search_files`
2. Identify where new code should be placed
3. Plan database schema changes if needed
4. Design API endpoints following project conventions
5. Consider integration points with existing features

## Step 3: Implementation Setup
1. Create feature branch with `execute_command` using project's git workflow
2. Set up any new dependencies needed
3. Create placeholder files following project structure
4. Set up corresponding test files

## Step 4: Development Checklist
Implement following project standards:
- [ ] Follow established code organization patterns
- [ ] Use project's error handling conventions
- [ ] Implement proper logging using project's logging framework
- [ ] Add unit tests following project's testing patterns
- [ ] Update relevant documentation

## Step 5: Integration Testing
1. Test integration with existing features
2. Verify no regressions in existing functionality
3. Test in project's development environment
4. Validate against acceptance criteria